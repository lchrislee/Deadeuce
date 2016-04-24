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
@property (nonatomic, strong) NSString* gameID;
@property (nonatomic, strong) NSString* userID;
@end

@implementation DeadeuceCaller
@synthesize delegate;

//TODO this should persist
- (void) setGameID:(NSString*)gameID
{
    _gameID = gameID;
}
- (NSString*) getGameID
{
    return _gameID;
}
- (void) setUserID:(NSString*)userID
{
    _userID = userID;
}
- (NSString*) getUserID
{
    return _userID;
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
                NSLog(@"Data is: %@", output);
            }
        }];
    }
}

- (BOOL) loginWithInfo: (NSDictionary*) info
{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@loginUser/", self.baseRestUrl] ];
    NSURLRequest *request = [self createRequestForURL:url withData:info andRequestType:[self.requestToType objectForKey:@"login"]];
    
    if (!request)
    {
        return false;
    } else{
        [self sendRequest:request withHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error || ((NSHTTPURLResponse *)response).statusCode != 200){
                NSLog(@"Error: %@", [error localizedDescription]);
                [delegate loginSuccess:NO andGameID:nil];
            } else{
                NSError *error;
                NSDictionary *output = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
                NSNumber * isSuccessNumber = (NSNumber *)[output objectForKey:@"loginSuccess"];
                [self setUserID:info[@"userID"]];
                ([isSuccessNumber boolValue] == YES) ? [delegate loginSuccess:YES andGameID:[output objectForKey:@"gameID"]] : [delegate loginSuccess:NO andGameID:nil];
            }
        }];
        return true;
    }
}

//Input: userInfo {name, email, password}
- (BOOL) signupWithInfo: (NSDictionary*) info
{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@createUser/", self.baseRestUrl] ];
    NSURLRequest *request = [self createRequestForURL:url withData:info andRequestType:[self.requestToType objectForKey:@"signup"]];
    
    if (!request)
    {
        return false;
    } else{
        [self sendRequest:request withHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error || ((NSHTTPURLResponse *)response).statusCode != 200){
                NSLog(@"Error: %@", [error localizedDescription]);
                [delegate signupSuccess:nil];
            } else{
                NSError *error;
                NSDictionary *output = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
                [self setUserID:output[@"userID"]];
                [delegate signupSuccess:output[@"userID"]];
            }
        }];
        return true;
    }
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
                [delegate joinedGame:[output objectForKey:@"joinSuccess"] withGameID:[output objectForKey:@"gameID"]];
            }
        }];
        return true;
    }
}

- (BOOL) createGame: (NSDictionary *) gameInfo{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@createGame/", self.baseRestUrl] ];
    NSURLRequest *request = [self createRequestForURL:url withData:gameInfo andRequestType:[self.requestToType objectForKey:@"createGame"]];
    
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
                [delegate createdGame:[output objectForKey:@"gameID"]];
            }
        }];
        return true;
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
            }
        }];
    }
}

- (void) getGameStatus: (NSDictionary *) gameID
{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@game/status/", self.baseRestUrl]];
    NSURLRequest *request = [self createRequestForURL:url
                                             withData:gameID
                                       andRequestType:[self.requestToType objectForKey:@"getGameStatus"]];
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
                [delegate setGameStatus:output];
            }
        }];
    }
}

- (void) getGameCheckList:(NSDictionary *)gameID
{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@game/checklist/", self.baseRestUrl]];
    NSURLRequest *request = [self createRequestForURL:url
                                             withData:gameID
                                       andRequestType:[self.requestToType objectForKey:@"getGameCheckList"]];
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
                [delegate setGameCheckList:output];
            }
        }];
    }
}

- (void) getGameMap:(NSDictionary *)gameID
{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@game/map/", self.baseRestUrl]];
    NSURLRequest *request = [self createRequestForURL:url
                                             withData:gameID
                                       andRequestType:[self.requestToType objectForKey:@"getGameMap"]];
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
                [delegate setGameMap:output];
            }
        }];
    }
}

- (void) takeAction: (NSDictionary *) action
{
    NSURL *url = [NSURL URLWithString:[NSString stringWithFormat:@"%@game/action/", self.baseRestUrl] ];
    NSURLRequest *request = [self createRequestForURL:url withData:action andRequestType:[self.requestToType objectForKey:@"takeAction"]];
    
    if (!request)
    {
        return;
    }else{
        [self sendRequest:request withHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
            if (error || ((NSHTTPURLResponse *)response).statusCode != 200){
                NSLog(@"Error: %@", [error localizedDescription]);
            }else{
                NSError *error;
                NSDictionary *output = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];
                [delegate receiveFeedback:output];
            }
        }];
        return;
    }
}

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
        BOOL debug = NO;
         _baseRestUrl = @"http://54.193.7.18:4000/";
        if(debug){
            _baseRestUrl = @"http://localhost:4000/";
        }
        _requestToType = @{@"test_slice": @"POST",
                           @"login": @"POST",
                           @"signup": @"POST",
                           @"joinGame": @"PUT",
                           @"createGame":@"POST",
                           @"getGames": @"GET",
                           @"getGameStatus": @"POST", /*Get POST haxxxor*/
                           @"getGameMap": @"POST",
                           @"takeAction": @"PUT",
                           @"getGameCheckList":@"POST"};
    }
    return self;
}

@end
