//
//  GameEventObject.m
//  Deadeuce
//
//  Created by Omar Khulusi on 4/2/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "GameEventObject.h"

@implementation GameEventObject

- (instancetype)init
{
    if (self = [super init])
    {
        //Dummy data lols
        NSArray* randomSuggester = @[@"Omar's Occults", @"Alex's Artisans", @"Chris's Captains", @"Zoe's Zealots",
                                     @"Rona's Raiders", @"Michelle's Masterminds", @"Trina's Travelers"];
        NSArray* randomWeapon = @[@"empty soda cans", @"overly sharp skittles wrapper", @"tommy trojan's sword",
          @"EVKitty's left paw", @"freshman on a longboard", @"rotten chanos nachos"];
        NSArray* randomLocation = @[@"Lyon Center", @"Leavey Library", @"Traddies",
          @"Ground Zero", @"The 90", @"Bovard",
          @"EVK", @"The Row", @"Campus Center"];
        
        _suggester = randomSuggester[arc4random_uniform(7)];
        _suggestedTo = randomSuggester[arc4random_uniform(7)];
        _suggestedWeapon = randomWeapon[arc4random_uniform(6)];
        _suggestedLocation = randomLocation[arc4random_uniform(9)];
        _revealedLocation = randomLocation[arc4random_uniform(9)];
        
        _timeStamp = [NSDate date];
    
    }
    
    return self;
}

@end
