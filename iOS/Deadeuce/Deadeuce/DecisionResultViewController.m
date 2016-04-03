//
//  AccusalResultsViewController.m
//  Deadeuce
//
//  Created by Omar Khulusi on 3/30/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "DecisionResultViewController.h"
#import <SWRevealViewController.h>
#import "LobbyTableViewController.h"

@interface DecisionResultViewController ()

@property (nonatomic, strong) NSString* decisionType;
@property (nonatomic, strong) UILabel *resultLabel;
@property (nonatomic, strong) UIButton *gamesListButton;

@end

@implementation DecisionResultViewController

-(void)gameListButtonPressed:(id)sender
{
    //TODO FIX THIS
    LobbyTableViewController * lVc = [[LobbyTableViewController alloc] init];
    UINavigationController *frontNavigationController = [[UINavigationController alloc] initWithRootViewController:lVc];
    [self.revealViewController setFrontViewController:frontNavigationController animated:YES];
}


-(instancetype)initWithDecisionType:(NSString*)decisionType
{
    if (self = [super init])
    {
        _decisionType = decisionType;
        self.navigationItem.title = @"Accuse";
        self.data = @[@"Lyon Center", @"Empty Soda Cans", @"EVKitty"];
        [self.navigationItem setHidesBackButton:YES animated:NO];
    }
    
    return self;
}

- (void)loadView
{
    self.view = [[UIView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.view.backgroundColor = [UIColor colorWithRed:(231/255.0) green:(232/255.0) blue:(231/255.0) alpha:1.0];
    
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    CGFloat screenWidth = screenRect.size.width;
    CGFloat screenHeight = screenRect.size.height;
    
    CGFloat startingHeight = self.navigationController.navigationBar.frame.size.height;
    
    CGRect tableViewFrame = CGRectMake(0.0, 0.0, self.view.frame.size.width, 238);
    _tableView = [[UITableView alloc] initWithFrame:tableViewFrame style:UITableViewStylePlain];
    _tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    [_tableView setDataSource:self];
    [_tableView setDelegate:self];
    
    self.resultLabel = [[UILabel alloc] init];
    [self.resultLabel setFrame:CGRectMake(20.0, startingHeight + 200.0, screenWidth - 40.0, 160.0)];
    self.resultLabel.numberOfLines = 5;
    self.resultLabel.textColor=[UIColor blackColor];
    self.resultLabel.userInteractionEnabled = NO;
    self.resultLabel.textAlignment = NSTextAlignmentCenter;
    self.resultLabel.text= @"The other players in the game have been notified. You have solved the case and President Nikias will dedicate the next USC building in your name.";
    [self.resultLabel setFont:[UIFont fontWithName:@"HelveticaNeue" size:20]];
    
    //Init Login Button
    self.gamesListButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [self.gamesListButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.gamesListButton.layer.cornerRadius = 5;
    self.gamesListButton.clipsToBounds = YES;
    [self.gamesListButton.layer setBackgroundColor:[[UIColor colorWithRed:(134/255.0) green:(134/255.0) blue:(134/255.0) alpha:1.0] CGColor]];
    [self.gamesListButton addTarget:self
                         action:@selector(gameListButtonPressed:)
               forControlEvents:UIControlEventTouchUpInside];
    [self.gamesListButton setTitle:@"Return To Games List" forState:UIControlStateNormal];
    self.gamesListButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:20];
    self.gamesListButton.frame = CGRectMake(20.0, screenHeight - 74.0, screenWidth - 40.0, 64.0);
    
    [self.view addSubview:_tableView];
    [self.view addSubview:self.resultLabel];
    [self.view addSubview:self.gamesListButton];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    return 40.0;
}

- (CGFloat)tableView:(UITableView*)tableView heightForFooterInSection:(NSInteger)section {
    return 1.0;
}

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0.0, -1.0, tableView.frame.size.width, 44.0)];
    /* Hackathon Quality */
    UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(10.0, -1.0, tableView.frame.size.width, 44.0)];
    [label setFont:[UIFont boldSystemFontOfSize:18]];
    NSString *title = @"Accusal Results";
    /* Section header is in 0th index... */
    [label setText:title];
    [view addSubview:label];
    return view;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.data.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *cellIdentifier = @"Cell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    
    if (!cell) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    
    [cell.textLabel setText:self.data[indexPath.row]];
    [cell.textLabel setFont:[UIFont systemFontOfSize:18]];
    
    return cell;
}


@end
