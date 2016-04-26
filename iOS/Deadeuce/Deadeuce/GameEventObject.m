//
//  GameEventObject.m
//  Deadeuce
//
//  Created by Omar Khulusi on 4/2/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "GameEventObject.h"

@implementation GameEventObject

- (instancetype)initWithPayload:(NSDictionary*)payload
{
    if (self = [super init])
    {
        NSString* accuser = [payload objectForKey:@"accuser"];
        NSString* suspect = [payload objectForKey:@"suspect"];
        NSString* weapon = [payload objectForKey:@"weapon"];
        NSString* location = [payload objectForKey:@"location"];
        
        NSString* epochTime = [payload objectForKey:@"epoch"];
        NSTimeInterval seconds = [epochTime doubleValue]/1000.0;
        
        _isSuggest = [[payload objectForKey:@"action"] isEqualToString:@"suggest"];
        _timeStamp = [[NSDate alloc] initWithTimeIntervalSince1970:seconds];
        
        _suggester = accuser;
        _suggestedTo = suspect;
        _suggestedWeapon = weapon;
        _suggestedLocation = location;
        _revealedLocation = location;
    }
    
    return self;
}

@end
