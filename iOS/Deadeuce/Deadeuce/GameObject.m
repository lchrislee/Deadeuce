//
//  GameObject.m
//  Deadeuce
//
//  Created by Omar Khulusi on 3/22/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "GameObject.h"
#import <stdlib.h>

@implementation GameObject

- (instancetype)initWithGameName:(NSString*)gameName andNumberOfPlayers:(NSInteger)numberOfPlayers
{
    if (self = [super init])
    {
        _gameName = gameName;
        _numberOfPlayers = numberOfPlayers;
    }
    
    return self;
}

@end
