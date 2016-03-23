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

- (instancetype)init
{
    if (self = [super init])
    {
        //Dummy data lols
        NSArray* random = @[@"Omar's Occults", @"Alex's Artisans", @"Chris's Captains", @"Zoe's Zealots",
                            @"Rona's Raiders", @"Michelle's Masterminds", @"Trina's Travelers"];
        _gameName = random[arc4random_uniform(7)];
        _numberOfPlayers = arc4random_uniform(6);
    }
    
    return self;
}

@end
