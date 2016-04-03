//
//  DeadeuceCaller.h
//  Deadeuce
//
//  Created by Chris Lee on 4/3/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DeadeuceCaller : NSObject

// designated allocator and initialization
+ (instancetype) sharedCaller;
- (void) testSlice: (NSDictionary *) bodyDict;
- (BOOL) joinGame: (NSDictionary *) gameInfo;
@end