//
//  LobbyTableViewController.h
//  Deadeuce
//
//  Created by Omar Khulusi on 3/11/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DeadeuceCaller.h"

@interface LobbyTableViewController : UITableViewController<DeadeuceDelegate, UITextFieldDelegate>

@property (nonatomic, strong) NSMutableArray* data;
@property (nonatomic, strong) NSString* gameName;

@end
