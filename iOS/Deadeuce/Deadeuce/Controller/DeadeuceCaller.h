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
@optional -(void) joinedGame:(BOOL)joined withGameID:(NSString*)gameID;
@optional -(void) setGameStatus:(NSDictionary *)gameStatus;
@optional -(void) setGameCheckList: (NSDictionary *)gameCheckList;
@optional -(void) setGameMap:(NSDictionary *)gameMapInfo;
@optional -(void) receiveFeedback:(NSDictionary *)feedback;

@optional -(void) loginSuccess:(BOOL)success;
@optional -(void) signupSuccess:(NSString*)userID;

@end

@interface DeadeuceCaller : NSObject

@property (nonatomic, weak) id<DeadeuceDelegate> delegate;

// designated allocator and initialization
+ (instancetype) sharedInstance;

//Set should be called only once
- (void) setGameID:(NSString*)gameID;
- (NSString*) getGameID;


- (BOOL) loginWithInfo: (NSDictionary*) info;
- (BOOL) signupWithInfo: (NSDictionary*) info;

- (void) testSlice: (NSDictionary *) bodyDict;
- (BOOL) joinGame: (NSDictionary *) gameInfo;
- (void) getGames; //goes to server
- (void) getGameStatus: (NSDictionary *) gameID;
- (void) getGameCheckList: (NSDictionary *) gameID;
- (void) getGameMap: (NSDictionary *) gameID;
- (void) takeAction: (NSDictionary *) action;

@end