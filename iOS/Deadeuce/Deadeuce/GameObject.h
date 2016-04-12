//
//  GameObject.h
//  Deadeuce
//
//  Created by Omar Khulusi on 3/22/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface GameObject : NSObject

- (instancetype)initWithGameName:(NSString*)gameName andNumberOfPlayers:(NSInteger)numberOfPlayers;

@property (nonatomic, strong) NSString* gameName;
@property NSInteger numberOfPlayers;

@end
