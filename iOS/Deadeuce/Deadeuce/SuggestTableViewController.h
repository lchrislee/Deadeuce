//
//  SuggestTableViewController.h
//  Deadeuce
//
//  Created by Omar Khulusi on 4/2/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DeadeuceCaller.h"

@interface SuggestTableViewController : UITableViewController <UITableViewDataSource, DeadeuceDelegate>

@property (nonatomic, strong) NSArray* locations;
@property (nonatomic, strong) NSArray* weapons;
@property (nonatomic, strong) NSArray* people;
@property (nonatomic, strong) NSArray* sectionData;

@end
