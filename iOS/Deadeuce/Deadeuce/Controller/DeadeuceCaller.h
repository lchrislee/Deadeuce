//
//  DeadeuceCaller.h
//  Deadeuce
//
//  Created by Chris Lee on 4/3/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 *  Protocol is used to transport the result
 */

@protocol DeadeuceDelegate <NSObject>

@optional -(void) listOfGames:(NSDictionary *)payload;
@optional -(void) joinedGame:(BOOL)joined;

@end

@interface DeadeuceCaller : NSObject

@property (nonatomic, weak) id<DeadeuceDelegate> delegate;

// designated allocator and initialization
+ (instancetype) sharedInstance;
- (void) testSlice: (NSDictionary *) bodyDict;
- (BOOL) joinGame: (NSDictionary *) gameInfo;
- (void) getGames; //goes to server

@end