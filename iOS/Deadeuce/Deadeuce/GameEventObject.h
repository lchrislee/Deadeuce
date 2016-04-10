//
//  GameEventObject.h
//  Deadeuce
//
//  Created by Omar Khulusi on 4/2/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface GameEventObject : NSObject

- (instancetype)initWithPayload:(NSDictionary*)payload;

@property (nonatomic, strong) NSString* suggester;
@property (nonatomic, strong) NSString* suggestedTo;
@property (nonatomic, strong) NSString* suggestedWeapon;
@property (nonatomic, strong) NSString* suggestedLocation;
@property (nonatomic, strong) NSString* revealedLocation;
@property (nonatomic, strong) NSDate* timeStamp;

@end
