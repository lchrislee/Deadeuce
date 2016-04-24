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
#import "DetectivePadTableViewController.h"
#import "LobbyTableViewController.h"
#import "AuthViewController.h"
#import "CurrentGameViewController.h"
#import "DeadeuceCaller.h"

@interface DecisionResultViewController ()

@property BOOL isSuggestion;
@property (nonatomic, strong) NSString* feedback;
@property BOOL correct;

@property (nonatomic, strong) UILabel *resultLabel;

@property (nonatomic, strong) UIButton *gameFeedButton;
@property (nonatomic, strong) UIButton *gamesListButton;

@end

@implementation DecisionResultViewController

-(void)gameListButtonPressed:(UIButton*)sender
{
    BOOL flag = NO;
    [[DeadeuceCaller sharedInstance] setGameID:@""];
    NSMutableArray *allViewControllers = [NSMutableArray arrayWithArray:[self.navigationController viewControllers]];
    for (UIViewController *aViewController in allViewControllers) {
        if ([aViewController isKindOfClass:[LobbyTableViewController class]]) {
            flag = YES;
            [self.navigationController popToViewController:aViewController animated:YES];
            return;
        }
    }
    
    if(!flag){
        for (UIViewController *aViewController in allViewControllers) {
            if([aViewController isKindOfClass:[AuthViewController class]]) {
                LobbyTableViewController *lVc = [[LobbyTableViewController alloc] initWithStyle:UITableViewStylePlain];
                [self.navigationController pushViewController:lVc animated:YES];
                return;
            }
        }
    }
    
}
-(void)gameFeedButtonPressed:(id)sender
{
    NSMutableArray *allViewControllers = [NSMutableArray arrayWithArray:[self.navigationController viewControllers]];
    for (UIViewController *aViewController in allViewControllers) {
        if ([aViewController isKindOfClass:[CurrentGameViewController class]]) {
            [self.navigationController popToViewController:aViewController animated:YES];
        }
    }
}

-(instancetype)initWithOptions:(NSArray*)options andFeedback:(NSDictionary*)feedback
{
    if (self = [super init])
    {
        _isSuggestion = [[feedback objectForKey:@"action"] isEqualToString:@"suggest"];
        
        NSLog(@"%@", feedback);
        _feedback = [feedback objectForKey:@"feedback"];
        _correct = ([[feedback objectForKey:@"correct"] boolValue]);
        
        if(_isSuggestion){
            self.navigationItem.title = @"Suggest";
        } else {
           self.navigationItem.title = @"Accuse";
        }
        
        self.data = options;
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
    
    CGFloat tableViewHeight = 280;
    CGRect tableViewFrame = CGRectMake(0.0, 0.0, self.view.frame.size.width, tableViewHeight);
    _tableView = [[UITableView alloc] initWithFrame:tableViewFrame style:UITableViewStylePlain];
    _tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    [_tableView setDataSource:self];
    [_tableView setDelegate:self];
    
    self.resultLabel = [[UILabel alloc] init];
    [self.resultLabel setFrame:CGRectMake(20.0, startingHeight + 240.0, screenWidth - 40.0, 160.0)];
    self.resultLabel.numberOfLines = 5;
    self.resultLabel.textColor=[UIColor blackColor];
    self.resultLabel.userInteractionEnabled = NO;
    self.resultLabel.textAlignment = NSTextAlignmentCenter;
    
    if(!_isSuggestion){
        if(_correct){
            self.resultLabel.text = @"The other players in the game have been notified. You have solved the case and President Nikias will dedicate the next USC building in your name.";
            self.resultLabel.textColor = [UIColor greenColor];
        } else {
            self.resultLabel.text = @"You are no longer able to make suggestions in this game, but you may still observe the game.  The other players in the game have been notified.";
            self.resultLabel.textColor = [UIColor redColor];
        }
    } else {
        self.resultLabel.text = _feedback;
    }
    
    [self.resultLabel setFont:[UIFont fontWithName:@"HelveticaNeue" size:20]];
    
    if(!_isSuggestion){
        self.gamesListButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
        [self.gamesListButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        self.gamesListButton.layer.cornerRadius = 5;
        self.gamesListButton.clipsToBounds = YES;
        [self.gamesListButton.layer setBackgroundColor:[[UIColor colorWithRed:(134/255.0) green:(134/255.0) blue:(134/255.0) alpha:1.0] CGColor]];
        [self.gamesListButton addTarget:self
                                 action:@selector(gameListButtonPressed:)
                       forControlEvents:UIControlEventTouchUpInside];
        [self.gamesListButton setTitle:@"Return to Games List" forState:UIControlStateNormal];
        self.gamesListButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:20];
        self.gamesListButton.frame = CGRectMake(20.0, screenHeight - 143.0, screenWidth - 40.0, 64.0);
    }
    
    self.gameFeedButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [self.gameFeedButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.gameFeedButton.layer.cornerRadius = 5;
    self.gameFeedButton.clipsToBounds = YES;
    [self.gameFeedButton.layer setBackgroundColor:[[UIColor colorWithRed:(134/255.0) green:(134/255.0) blue:(134/255.0) alpha:1.0] CGColor]];
    [self.gameFeedButton addTarget:self
                         action:@selector(gameFeedButtonPressed:)
               forControlEvents:UIControlEventTouchUpInside];
    
    [self.gameFeedButton setTitle:@"Return to Game Feed" forState:UIControlStateNormal];
    self.gameFeedButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:20];
    self.gameFeedButton.frame = CGRectMake(20.0, screenHeight - 74.0, screenWidth - 40.0, 64.0);
    
    [self.view addSubview:_tableView];
    [self.view addSubview:self.resultLabel];
    if(!_isSuggestion){
        [self.view addSubview:self.gamesListButton];
    }
    [self.view addSubview:self.gameFeedButton];
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
    NSString *title = _isSuggestion ? @"Suggestion Feedback" : @"Accusation Result";
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
        NSString* correctOrIncorrect = (_correct) ? @"Correct" : @"Incorrect";
        NSString* suggestionOrAccusation = (_isSuggestion) ? @"Suggestion" : @"Accusation";
        NSString* totalString = [NSString stringWithFormat:@"Your %@ was %@", suggestionOrAccusation, correctOrIncorrect];
        
        UIColor* correctnessColor = (_correct) ? [UIColor greenColor] : [UIColor redColor];
        NSMutableAttributedString *text = [[NSMutableAttributedString alloc] initWithString:totalString];
        [text addAttribute:NSForegroundColorAttributeName value:[UIColor blackColor] range: NSMakeRange(0, totalString.length - correctOrIncorrect.length)];
        [text addAttribute:NSForegroundColorAttributeName value:correctnessColor range:NSMakeRange(totalString.length-correctOrIncorrect.length, correctOrIncorrect.length)];
        [cell.textLabel setAttributedText:text];
    } else {
        [cell.textLabel setText:self.data[indexPath.row - 1]];
        [cell.textLabel setFont:[UIFont systemFontOfSize:18]];
    }
    
    return cell;
}


@end
