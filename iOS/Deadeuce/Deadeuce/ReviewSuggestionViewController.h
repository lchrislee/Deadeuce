//
//  ReviewSuggestionViewController.h
//  Deadeuce
//
//  Created by Omar Khulusi on 4/2/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DeadeuceCaller.h"

@interface ReviewSuggestionViewController : UIViewController<UITableViewDataSource,UITableViewDelegate, DeadeuceDelegate>
{
    UITableView* _tableView;
}
@property (nonatomic, strong) NSMutableArray* data;

-(instancetype) initWithLocation:(NSString*)location weapon:(NSString*)weapon person:(NSString*)person;
@end
