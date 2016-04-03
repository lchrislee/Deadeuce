//
//  AccusalResultsViewController.h
//  Deadeuce
//
//  Created by Omar Khulusi on 3/30/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DecisionResultViewController : UIViewController<UITableViewDataSource,UITableViewDelegate>
{
      UITableView* _tableView;
}
@property (nonatomic, strong) NSArray* data;

@end
