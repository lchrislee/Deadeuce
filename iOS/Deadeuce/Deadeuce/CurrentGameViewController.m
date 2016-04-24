//
//  CurrentGameViewController.m
//  Deadeuce
//
//  Created by Omar Khulusi on 4/2/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "CurrentGameViewController.h"
#import <SWRevealViewController.h>
#import "DetectivePadTableViewController.h"
#import "SuggestTableViewController.h"
#import "GameEventObject.h"
#import "AppDelegate.h"

@interface GameEventTableViewCell : UITableViewCell

@property (nonatomic, strong) UIView* background;
@property (nonatomic, strong) UIView* innerBackground;
@property (nonatomic, strong) UILabel* eventLabel;
@property (nonatomic, strong) UILabel* locationLabel;
@property (nonatomic, strong) UILabel* timeStampLabel;
@property (nonatomic, strong) UIImageView* magnifyingGlassImageView;

@end

@implementation GameEventTableViewCell

const CGFloat kLabelHeight3 = 36;

const CGFloat kImageWidth3 = 36;
const CGFloat kImageHeight3 = 36;

const CGFloat kTextWidth3 = 200;
const CGFloat kPadding3 = 6;

- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    if (self = [super initWithStyle:style reuseIdentifier:reuseIdentifier])
    {
        self.background = [[UIView alloc] init];
        self.background.backgroundColor = [UIColor colorWithRed:(231/255.0) green:(231/255.0) blue:(231/255.0) alpha:1.0];
        [self.contentView addSubview:self.background];
        
        self.innerBackground = [[UIView alloc] init];
        self.innerBackground.backgroundColor = [UIColor whiteColor];
        [self.contentView addSubview:self.innerBackground];
        
        self.eventLabel = [[UILabel alloc] init];
        self.eventLabel.numberOfLines = 2;
        [self.eventLabel setTextColor:[UIColor colorWithRed:(67/255.0) green:(67/255.0) blue:(67/255.0) alpha:1.0]];
        [self.eventLabel setFont:[UIFont systemFontOfSize:12]];
        [self.contentView addSubview:self.eventLabel];
        
        self.locationLabel = [[UILabel alloc] init];
        [self.locationLabel setTextColor:[UIColor colorWithRed:(67/255.0) green:(67/255.0) blue:(67/255.0) alpha:1.0]];
        [self.locationLabel setFont:[UIFont systemFontOfSize:12]];
        self.locationLabel.textAlignment = NSTextAlignmentRight;
        [self.contentView addSubview:self.locationLabel];
        
        self.timeStampLabel = [[UILabel alloc] init];
        [self.timeStampLabel setTextColor:[UIColor colorWithRed:(67/255.0) green:(67/255.0) blue:(67/255.0) alpha:1.0]];
        [self.timeStampLabel setFont:[UIFont systemFontOfSize:12]];
        [self.contentView addSubview:self.timeStampLabel];
        
        self.magnifyingGlassImageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"search.png"]];
        [self.contentView addSubview:self.magnifyingGlassImageView];
    }
    
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    
    
    CGRect backgroundFrame = self.contentView.bounds;
    self.background.frame = backgroundFrame;
    
    backgroundFrame.origin.x += kPadding3;
    backgroundFrame.origin.y += kPadding3/2;
    backgroundFrame.size.width -= 2*kPadding3;
    backgroundFrame.size.height -= kPadding3;
    self.innerBackground.frame = backgroundFrame;
    
    CGRect imageFrame = backgroundFrame;
    imageFrame.origin.x += kPadding3;
    imageFrame.origin.y += kPadding3;
    imageFrame.size.width = kImageWidth3;
    imageFrame.size.height = kImageHeight3;
    self.magnifyingGlassImageView.frame = imageFrame;
    
    CGRect eventLabelFrame = imageFrame;
    eventLabelFrame.size.height = kLabelHeight3;
    eventLabelFrame.origin.x += kPadding3 + kImageWidth3;
    eventLabelFrame.size.width = self.innerBackground.frame.size.width - kImageWidth3 - kPadding3 * 2;
    self.eventLabel.frame = eventLabelFrame;
    
    CGRect timeStampFrame = imageFrame;
    timeStampFrame.size.height = kLabelHeight3/2;
    timeStampFrame.size.width = backgroundFrame.size.width/2;
    timeStampFrame.origin.y += kImageHeight3 + kPadding3;
    self.timeStampLabel.frame = timeStampFrame;
    
    CGRect locationLabelFrame = timeStampFrame;
    locationLabelFrame.origin.x = backgroundFrame.size.width/2;
    locationLabelFrame.size.width = backgroundFrame.size.width/2;
    self.locationLabel.frame = locationLabelFrame;
}

+ (CGFloat)cellHeight
{
    return kImageHeight3 + kLabelHeight3/2 + 4*kPadding3;
}

- (void)prepareForReuse
{
    /*   Keep this as is   */
}

@end

@interface CurrentGameViewController ()

@property (nonatomic, strong) UILabel *gameNameLabel;
@property (nonatomic, strong) UILabel *currentTurnLabel;

@property (nonatomic, strong) UIButton *suggestButton;
@property (nonatomic, strong) UIButton *detectivePadButton;
@property (nonatomic, strong) UIImageView* suggestIcon;
@property (nonatomic, strong) UIImageView* detectiveIcon;

@end

@implementation CurrentGameViewController

-(void)toggle:(id)sender
{
    [self.revealViewController revealToggleAnimated:YES];
}

-(void)suggestButtonPressed:(id)sender
{
    SuggestTableViewController * sVc = [[SuggestTableViewController alloc] initWithStyle:UITableViewStyleGrouped];
    [self.navigationController pushViewController:sVc animated:YES];
}

-(void)detectivePadButtonPressed:(id)sender
{
    DetectivePadTableViewController * detectivePadVc = [[DetectivePadTableViewController alloc] initWithStyle:UITableViewStyleGrouped];
    [self.navigationController pushViewController:detectivePadVc animated:YES];
}

- (instancetype)init
{
    if (self = [super init])
    {
        self.navigationItem.title = @"Deadeuce";
        
        SWRevealViewController *revealController = (SWRevealViewController*)[[(AppDelegate*)[[UIApplication sharedApplication]delegate] window] rootViewController];
        
        [revealController panGestureRecognizer];
        [revealController tapGestureRecognizer];
        
        //Add an image to your project & set that image here.
        UIBarButtonItem *revealButtonItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"reveal-icon.png"]
                                                                             style:UIBarButtonItemStylePlain target:self action:@selector(toggle:)];
        self.navigationItem.leftBarButtonItem = revealButtonItem;

        _data = [[NSMutableArray alloc] init];
        DeadeuceCaller* model = [DeadeuceCaller sharedInstance];
        model.delegate = self;
        NSString * gameID = [model getGameID];
        [model getGameStatus:@{@"gameID":gameID}];
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
    
    CGFloat startingHeight = self.navigationController.navigationBar.frame.size.height + 20.0;
    
    CGRect tableViewFrame = CGRectMake(0.0, 100.0, self.view.frame.size.width, screenHeight - 100.0);
    _tableView = [[UITableView alloc] initWithFrame:tableViewFrame style:UITableViewStylePlain];
    [_tableView registerClass:[GameEventTableViewCell class] forCellReuseIdentifier:@"GameEventTableViewCell"];
    _tableView.rowHeight = [GameEventTableViewCell cellHeight];
    _tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
    [_tableView setDataSource:self];
    [_tableView setDelegate:self];
    
    __weak UITableView *weakSelf = _tableView;
    [_tableView addPullToRefreshWithActionHandler:^{
        _data = [[NSMutableArray alloc] init];
        DeadeuceCaller* model = [DeadeuceCaller sharedInstance];
        NSString * gameID = [model getGameID];
        [model getGameStatus:@{@"gameID":gameID}];
        [weakSelf.pullToRefreshView stopAnimating];
    }];
    
    if(!_suggestButton){
        self.suggestButton = [UIButton buttonWithType:UIButtonTypeCustom];
        [self.suggestButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        [self.suggestButton setTitleColor:[UIColor colorWithRed:200.0/255.0 green:200.0/255.0 blue:200.0/255.0 alpha:0.3] forState:UIControlStateDisabled];
    }
    self.suggestButton.clipsToBounds = YES;
    [self.suggestButton.layer setBackgroundColor:[[UIColor colorWithRed:(134/255.0) green:(134/255.0) blue:(134/255.0) alpha:1.0] CGColor]];
    [self.suggestButton addTarget:self
                           action:@selector(suggestButtonPressed:)
                 forControlEvents:UIControlEventTouchUpInside];
    [self.suggestButton setTitle:@"Suggest" forState:UIControlStateNormal];
    self.suggestButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:20];
    self.suggestButton.frame = CGRectMake(0.0, startingHeight, screenWidth/2, 44.0);
    
    UIImage *btnDetective = [UIImage imageNamed:@"suggest_icon.png"];
    [_suggestButton setTitleEdgeInsets:UIEdgeInsetsMake(0.0, 10.0, 0.0, 0.0)];
    [_suggestButton setImage:btnDetective forState:UIControlStateNormal];
    
    self.detectivePadButton = [UIButton buttonWithType:UIButtonTypeCustom];
    [self.detectivePadButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.detectivePadButton.clipsToBounds = YES;
    [self.detectivePadButton.layer setBackgroundColor:[[UIColor colorWithRed:(134/255.0) green:(134/255.0) blue:(134/255.0) alpha:1.0] CGColor]];
    [self.detectivePadButton addTarget:self
                           action:@selector(detectivePadButtonPressed:)
                 forControlEvents:UIControlEventTouchUpInside];
    [self.detectivePadButton setTitle:@"Detective Pad" forState:UIControlStateNormal];
    self.detectivePadButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:20];
    self.detectivePadButton.frame = CGRectMake(screenWidth/2, startingHeight, screenWidth/2, 44.0);
    
    UIImage *btnIcon = [UIImage imageNamed:@"fingerprint.png"];
    [_detectivePadButton setTitleEdgeInsets:UIEdgeInsetsMake(0.0, 10.0, 0.0, 0.0)];
    [_detectivePadButton setImage:btnIcon forState:UIControlStateNormal];
    
    
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(screenWidth/2 - 1.5, startingHeight)];
    [path addLineToPoint:CGPointMake(screenWidth/2 - 1.5, startingHeight+44.0)];
    CAShapeLayer *shapeLayer = [CAShapeLayer layer];
    shapeLayer.path = [path CGPath];
    shapeLayer.strokeColor = [[UIColor whiteColor] CGColor];
    shapeLayer.lineWidth = 1.0;
    shapeLayer.fillColor = [[UIColor clearColor] CGColor];
    
    if(!_currentTurnLabel){
        _currentTurnLabel = [[UILabel alloc] init];
    }
    if(!_gameNameLabel){
        _gameNameLabel = [[UILabel alloc] init];
    }
    [self.gameNameLabel setFrame:CGRectMake(0.0, startingHeight + 44.0, screenWidth, 26.0)];
    self.gameNameLabel.textColor=[UIColor blackColor];
    self.gameNameLabel.backgroundColor = [UIColor whiteColor];
    self.gameNameLabel.userInteractionEnabled = NO;
    self.gameNameLabel.textAlignment = NSTextAlignmentCenter;
    [self.gameNameLabel setFont:[UIFont fontWithName:@"HelveticaNeue" size:20]];
    [self.currentTurnLabel setFrame:CGRectMake(0.0, startingHeight + 70.0, screenWidth, 26.0)];
    self.currentTurnLabel.textColor=[UIColor blackColor];
    self.currentTurnLabel.backgroundColor = [UIColor whiteColor];
    self.currentTurnLabel.userInteractionEnabled = NO;
    self.currentTurnLabel.textAlignment = NSTextAlignmentCenter;
    [self.currentTurnLabel setFont:[UIFont fontWithName:@"HelveticaNeue" size:20]];
 
    [self.view addSubview:_tableView];
    [self.view addSubview:self.suggestButton];
    [self.view addSubview:self.detectivePadButton];
    [self.view addSubview:self.gameNameLabel];
    [self.view addSubview:self.currentTurnLabel];
    
    [self.view.layer addSublayer:shapeLayer];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Deadeuce Delegate
-(void) setGameStatus:(NSDictionary *)gameStatus
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(!_currentTurnLabel){
            _currentTurnLabel = [[UILabel alloc] init];
        }
        if(!_gameNameLabel){
            _gameNameLabel = [[UILabel alloc] init];
        }
        if(!_suggestButton){
            self.suggestButton = [UIButton buttonWithType:UIButtonTypeCustom];
            [self.suggestButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
            [self.suggestButton setTitleColor:[UIColor colorWithRed:200.0/255.0 green:200.0/255.0 blue:200.0/255.0 alpha:0.3] forState:UIControlStateDisabled];
        }
        NSLog(@"%@", gameStatus);
        if([gameStatus objectForKey:@"gameWinner"]){
            _gameNameLabel.text = @"GAME OVER";
            _currentTurnLabel.text = [NSString stringWithFormat:@"Winner: %@", [gameStatus objectForKey:@"gameWinner"]];
        } else {
            _gameNameLabel.text = [NSString stringWithFormat:@"Game: %@", [gameStatus objectForKey:@"gameName"]];
            
            if([[gameStatus objectForKey:@"turnPlayerID"] isEqualToString:[[DeadeuceCaller sharedInstance] getUserID]]){
                _suggestButton.enabled = YES;
                _currentTurnLabel.text = [NSString stringWithFormat:@"Current Turn: %@ (You)", [gameStatus objectForKey:@"turnPlayerNickname"]];
            } else {
                _suggestButton.enabled = NO;
               _currentTurnLabel.text = [NSString stringWithFormat:@"Current Turn: %@", [gameStatus objectForKey:@"turnPlayerNickname"]];
            }
        }
        
        NSArray* feedPayload = [gameStatus objectForKey:@"feed"];
        for(int i = 0; i < feedPayload.count; i++){
            NSDictionary* feedItem = feedPayload[i];
            [_data addObject:[[GameEventObject alloc] initWithPayload:feedItem]];
        }
        [_tableView reloadData];
    });
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    return 1.0;
}

- (CGFloat)tableView:(UITableView*)tableView heightForFooterInSection:(NSInteger)section {
    return 1.0;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return self.data.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    //Normal cell
    GameEventTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"GameEventTableViewCell" forIndexPath:indexPath];
    
    GameEventObject *obj = _data[indexPath.row];
    
    cell.eventLabel.text = [NSString stringWithFormat:@"%@ suggested %@ used the %@ at %@",
                            obj.suggester, obj.suggestedTo, obj.suggestedWeapon, obj.suggestedLocation];
    cell.locationLabel.text = [NSString stringWithFormat:@"Revealed: %@",obj.revealedLocation];
    
    NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
    [dateFormatter setDateFormat:@"EEE, d MMM yyyy HH:mm:ss z"];
    [dateFormatter setTimeZone:[NSTimeZone timeZoneForSecondsFromGMT:0]];

    NSString *dateString = [dateFormatter stringFromDate:obj.timeStamp];
    cell.timeStampLabel.text = dateString;

    [cell setSelectionStyle:UITableViewCellSelectionStyleNone];
    
    return cell;
}

@end
