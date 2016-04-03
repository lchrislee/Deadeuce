//
//  ReviewSuggestionViewController.m
//  Deadeuce
//
//  Created by Omar Khulusi on 4/2/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "ReviewSuggestionViewController.h"
#import "DecisionResultViewController.h"
#import <SWRevealViewController.h>

@interface ReviewSuggestionViewController ()

@property (nonatomic, strong) UILabel *warningLabel;
@property (nonatomic, strong) UIButton *suggestButton;
@property (nonatomic, strong) UIButton *accuseButton;

@end

@implementation ReviewSuggestionViewController

-(void)decisionMade
{
    
}

-(void)suggestButtonPressed:(id)sender
{
    UIAlertController *alertController = [UIAlertController
                                          alertControllerWithTitle:nil
                                          message:@"Are you sure of your suggestion?"
                                          preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *noAction = [UIAlertAction
                               actionWithTitle:@"No"
                               style:UIAlertActionStyleCancel
                               handler:^(UIAlertAction * _Nonnull action) {}];
    UIAlertAction *yesAction = [UIAlertAction
                                 actionWithTitle:@"Yes"
                                 style:UIAlertActionStyleDefault
                                 handler:^(UIAlertAction * _Nonnull action) {
                                     DecisionResultViewController * dRVc = [[DecisionResultViewController alloc] init];
                                    [self.navigationController pushViewController:dRVc animated:YES];
                                }];
    [alertController addAction:noAction];
    [alertController addAction:yesAction];
    [self presentViewController:alertController animated:YES completion:nil];
}
-(void)accuseButtonPressed:(id)sender
{
    //Stub
}

-(instancetype) initWithLocation:(NSString*)location weapon:(NSString*)weapon person:(NSString*)person
{
    if (self = [super init])
    {
        self.data = [[NSMutableArray alloc] init];
        [self.data addObject:location];
        [self.data addObject:weapon];
        [self.data addObject:person];
        
        self.navigationItem.title = @"Review";

        [self.navigationItem.leftBarButtonItem setTitle:@"Back"];
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
    
    CGRect tableViewFrame = CGRectMake(0.0, 0.0, self.view.frame.size.width, 280);
    _tableView = [[UITableView alloc] initWithFrame:tableViewFrame style:UITableViewStylePlain];
    _tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    [_tableView setDataSource:self];
    [_tableView setDelegate:self];
    
    self.warningLabel = [[UILabel alloc] init];
    [self.warningLabel setFrame:CGRectMake(20.0, startingHeight + 220.0, screenWidth - 40.0, 160.0)];
    self.warningLabel.numberOfLines = 3;
    self.warningLabel.textColor=[UIColor blackColor];
    self.warningLabel.userInteractionEnabled = NO;
    self.warningLabel.textAlignment = NSTextAlignmentCenter;
    self.warningLabel.text= @"Note: Accusing wrongly will cause you to forfeit your current game. Suggestions have no penalities.";
    [self.warningLabel setFont:[UIFont fontWithName:@"HelveticaNeue" size:20]];
    
    self.suggestButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [self.suggestButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.suggestButton.layer.cornerRadius = 5;
    self.suggestButton.clipsToBounds = YES;
    [self.suggestButton.layer setBackgroundColor:[[UIColor colorWithRed:(134/255.0) green:(134/255.0) blue:(134/255.0) alpha:1.0] CGColor]];
    [self.suggestButton addTarget:self
                             action:@selector(suggestButtonPressed:)
                   forControlEvents:UIControlEventTouchUpInside];
    [self.suggestButton setTitle:@"Suggest" forState:UIControlStateNormal];
    self.suggestButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:20];
    self.suggestButton.frame = CGRectMake(20.0, screenHeight - 143.0, screenWidth - 40.0, 64.0);
    
    self.accuseButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [self.accuseButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.accuseButton.layer.cornerRadius = 5;
    self.accuseButton.clipsToBounds = YES;
    [self.accuseButton.layer setBackgroundColor:[[UIColor colorWithRed:(134/255.0) green:(134/255.0) blue:(134/255.0) alpha:1.0] CGColor]];
    [self.accuseButton addTarget:self
                           action:@selector(accuseButtonPressed:)
                 forControlEvents:UIControlEventTouchUpInside];
    [self.accuseButton setTitle:@"Accuse" forState:UIControlStateNormal];
    self.accuseButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:20];
    self.accuseButton.frame = CGRectMake(20.0, screenHeight - 74.0, screenWidth - 40.0, 64.0);
    
    [self.view addSubview:_tableView];
    [self.view addSubview:self.warningLabel];
    [self.view addSubview:self.suggestButton];
    [self.view addSubview:self.accuseButton];
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
    NSString *title = @"Review Selections";
    /* Section header is in 0th index... */
    [label setText:title];
    [view addSubview:label];
    return view;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.data.count + 1;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *cellIdentifier = @"Cell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    
    if (!cell) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    if(indexPath.row == 0){
        [cell.textLabel setText:@"You selected:"];
        [cell.textLabel setFont:[UIFont boldSystemFontOfSize:18]];
    } else {
        [cell.textLabel setText:self.data[indexPath.row-1]];
        [cell.imageView setImage:[UIImage imageNamed:@"selected.png"]];
        [cell.textLabel setFont:[UIFont systemFontOfSize:18]];
    }
    
    return cell;
}

@end
