//
//  LeftPanelViewController.m
//  SlideoutNavigation
//
//  Created by Tammy Coron on 1/10/13.
//  Copyright (c) 2013 Tammy L Coron. All rights reserved.
//

#import "LeftPanelViewController.h"
#import "SWRevealViewController.h"
#import "LobbyTableViewController.h"
#import "DetectivePadTableViewController.h"

@interface LeftPanelTableViewCell : UITableViewCell
@property (nonatomic, strong) UILabel *titleLabel;
@end

@implementation LeftPanelTableViewCell

static const CGFloat kTitleLabelHeight = 40;
static const CGFloat kLabelPadding = 8;
int count = 0;

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier])
    {
        self.titleLabel = [[UILabel alloc] init];
        [self.contentView addSubview:self.titleLabel];
    }
    
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    
    CGRect titleLabelFrame = self.contentView.bounds;
    titleLabelFrame.origin.y += kLabelPadding;
    titleLabelFrame.size.height = kTitleLabelHeight;
    titleLabelFrame.origin.x += kLabelPadding;
    titleLabelFrame.size.width -= 2*kLabelPadding;
    self.titleLabel.frame = titleLabelFrame;
}

+ (CGFloat)cellHeight
{
    return 2*kTitleLabelHeight + 2*kLabelPadding;
}

- (void)prepareForReuse
{
    /*   Keep this as is   */
    self.titleLabel.text = @"";
}

@end
@interface LeftPanelViewController ()

@property (nonatomic, strong) NSMutableArray *rowTitles;
@property int numberOfNights;

@end

@implementation LeftPanelViewController
{
    NSInteger _presentedRow;
}

#pragma mark -
#pragma mark View Did Load/Unload

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self setupArray];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
}

#pragma mark -
#pragma mark View Will/Did Appear

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

#pragma mark -
#pragma mark View Will/Did Disappear

- (void)viewWillDisappear:(BOOL)animated
{
    [super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
}

#pragma mark -
#pragma mark Array Setup

- (void)setupArray
{
    _presentedRow = -1;
    NSArray *data = @[@"Lobby", @"Detective Pad"];
    
    self.rowTitles = [NSMutableArray arrayWithArray:data];
    
    [self.tableView reloadData];
}

#pragma mark -
#pragma mark UITableView Datasource/Delegate

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [_rowTitles count];
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    return 54;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    LeftPanelTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"LPTableViewCell" forIndexPath:indexPath];
    cell.titleLabel.text = self.rowTitles[indexPath.row];
    
    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Grab a handle to the reveal controller, as if you'd do with a navigtion controller via self.navigationController.
    SWRevealViewController *revealController = self.revealViewController;
    
    // selecting row
    NSInteger row = indexPath.row;
    NSString* selection = self.rowTitles[indexPath.row];
    
    if(row == _presentedRow){
        [revealController revealToggleAnimated:YES];
        return;
    }
    // otherwise we'll create a new frontViewController and push it with animation
    
    UIViewController *newFrontController = nil;
    
    if ([selection  isEqual: @"Lobby"]) {
        newFrontController = [[LobbyTableViewController alloc] init];
    } else if ([selection  isEqual: @"Detective Pad"]) {
        newFrontController = [[DetectivePadTableViewController alloc] initWithStyle:UITableViewStyleGrouped];
    }
    
    UINavigationController *navigationController = [[UINavigationController alloc] initWithRootViewController:newFrontController];
    [revealController pushFrontViewController:navigationController animated:YES];
    
    _presentedRow = row;  // <- store the presented row
}

-(void) adjustNumberOfNights:(int)payload
{
    _numberOfNights = payload;
}
#pragma mark -
#pragma mark Default System Code

- (instancetype)initWithStyle:(UITableViewStyle)style
{
    if (self = [super initWithStyle:style])
    {
        _numberOfNights = 0;
        [self.tableView registerClass:[LeftPanelTableViewCell class] forCellReuseIdentifier:@"LPTableViewCell"];
        self.tableView.estimatedRowHeight = UITableViewAutomaticDimension;
        self.tableView.rowHeight = [LeftPanelTableViewCell cellHeight];
    }
    
    return self;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

@end
