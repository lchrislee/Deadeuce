//
//  DetectivePadTableViewController.h
//  Deadeuce
//
//  Created by Alex on 3/12/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DeadeuceCaller.h"

@interface DetectivePadTableViewController : UITableViewController <UITableViewDataSource, DeadeuceDelegate>

@property (nonatomic, strong) NSArray* locations;
@property (nonatomic, strong) NSArray* weapons;
@property (nonatomic, strong) NSArray* people;
@property (nonatomic, strong) NSArray* sectionData;
@property (nonatomic, strong) NSMutableDictionary* selectedRows;

@end
