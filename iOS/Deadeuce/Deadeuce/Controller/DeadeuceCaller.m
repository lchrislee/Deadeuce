//
//  DeadeuceCaller.m
//  Deadeuce
//
//  Created by Chris Lee on 4/3/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//


#import "DeadeuceCaller.h"

@interface DeadeuceCaller ()
@property (strong, nonatomic) NSString* baseRestUrl;
@property (strong, nonatomic) NSDictionary *requestToType;
@end

@implementation DeadeuceCaller
@synthesize delegate;

- (NSMutableURLRequest *) createRequestForURL: (NSURL *)url withData:(NSDictionary *) data andRequestType:(NSString *) type{
    NSLog(@"URL IS: %@", [url absoluteString]);
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request setHTTPMethod:type];
    if(data != nil){
        NSError *error;
        NSData *body = [NSJSONSerialization dataWithJSONObject:data options:NSJSONWritingPrettyPrinted error:&error];
        
        if (error){
            NSLog(@"Error: %@", [error localizedDescription]);
            return NULL;
        }
        [request setHTTPBody:body];
    }
    
    return request;
}

- (void) sendRequest: (NSURLRequest *) request withHandler: (void (^)(NSData* data, NSURLResponse* response, NSError* error)) handler{
    NSURLSession *session = [NSURLSession sharedSession];
    NSURLSessionTask *dataTask = [session dataTaskWithRequest:request completionHandler:handler];
    [dataTask resume];
}

- (BOOL) joinGame: (NSDictionary *) gameInfo{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@joinGame/", self.baseRestUrl] ];
    NSURLRequest *request = [self createRequestForURL:url withData:gameInfo andRequestType:[self.requestToType objectForKey:@"joinGame"]];
    
    if (!request)
    {
        return false;
    }else{
        [self sendRequest:request withHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error || ((NSHTTPURLResponse *)response).statusCode != 200){
                NSLog(@"Error: %@", [error localizedDescription]);
            }else{
                NSError *error;
                NSDictionary *output = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
                [delegate joinedGame:[output objectForKey:@"joinSuccess"]];
                if (error){
                    NSLog(@"Error: %@", [error localizedDescription]);
                    return;
                }
                NSLog(@"Data is: %@", output);
            }
        }];
        return true;
    }
}

- (void) testSlice: (NSDictionary *) bodyDict{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@test_slice/", self.baseRestUrl]];
    NSURLRequest *request = [self createRequestForURL:url withData:bodyDict andRequestType:[self.requestToType objectForKey:@"test_slice"]];
    
    if (!request){
        return;
    }else{
        [self sendRequest:request withHandler:^(NSData * data, NSURLResponse * response, NSError * error) {
            if (error || ((NSHTTPURLResponse *)response).statusCode != 200){
                NSLog(@"Error: %@", [error localizedDescription]);
            }else{
                NSError *error;
                NSDictionary *output = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
                if (error){
                    NSLog(@"Error: %@", [error localizedDescription]);
                    return;
                }
                NSLog(@"Data is: %@", output);
            }
        }];
    }
}

- (void) getGames
{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@game/all/", self.baseRestUrl]];
    NSURLRequest *request = [self createRequestForURL:url withData:nil andRequestType:[self.requestToType objectForKey:@"getGames"]];
    if (!request){
        return;
    } else {
        [self sendRequest:request withHandler:^(NSData * data, NSURLResponse * response, NSError * error) {
            if (error || ((NSHTTPURLResponse *)response).statusCode != 200){
                NSLog(@"%ld", (long)((NSHTTPURLResponse *)response).statusCode);
                NSLog(@"Error: %@", [error localizedDescription]);
            }else{
                NSError *error;
                NSDictionary *output = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
                [delegate listOfGames:output];
                if (error){
                    NSLog(@"Error: %@", [error localizedDescription]);
                    return;
                }
            }
        }];
    }
    
}

+ (instancetype) sharedInstance{
    static DeadeuceCaller *deadeuceCaller = nil;
    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken, ^{
        deadeuceCaller = [[DeadeuceCaller alloc] init];
    });
    
    return deadeuceCaller;
}

- (instancetype) init{
    if (self = [super init]){
        BOOL debug = YES;
         _baseRestUrl = @"http://54.193.7.18:3000/";
        if(debug){
            _baseRestUrl = @"http://localhost:3000/";
        }
        _requestToType = @{@"test_slice": @"POST", @"joinGame": @"PUT", @"getGames": @"GET"};
    }
    return self;
}

@end