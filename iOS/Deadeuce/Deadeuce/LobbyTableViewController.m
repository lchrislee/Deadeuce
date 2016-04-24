//
//  LobbyTableViewController.m
//  Deadeuce
//
//  Created by Omar Khulusi on 3/11/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "LobbyTableViewController.h"
#import <SWRevealViewController.h>
#import "GameObject.h"
#import "AppDelegate.h"
#import "CurrentGameViewController.h"
#import "DeadeuceCaller.h"

@interface LobbyTableViewCell : UITableViewCell

@property (nonatomic, strong) UIView* background;
@property (nonatomic, strong) UIView* innerBackground;
@property (nonatomic, strong) UILabel *gameNameLabel;
@property (nonatomic, strong) UILabel *numberOfPlayersLabel;
@property (nonatomic, strong) UIButton* joinGameButton;
@property (nonatomic, strong) UIButton* logoutButton;

@end

@implementation LobbyTableViewCell

const CGFloat kLabelHeight = 36;

const CGFloat kButtonHeight = 40;
const CGFloat kButtonWidth = 100;
const CGFloat kLargeButtonWidth = 140;

const CGFloat kTextWidth = 200;
const CGFloat kPadding = 6;

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
        
        self.gameNameLabel = [[UILabel alloc] init];
        [self.gameNameLabel setTextColor:[UIColor colorWithRed:(67/255.0) green:(67/255.0) blue:(67/255.0) alpha:1.0]];
        [self.gameNameLabel setFont:[UIFont systemFontOfSize:22]];
        [self.contentView addSubview:self.gameNameLabel];
        
        self.numberOfPlayersLabel = [[UILabel alloc] init];
         [self.numberOfPlayersLabel setTextColor:[UIColor colorWithRed:(67/255.0) green:(67/255.0) blue:(67/255.0) alpha:1.0]];
        [self.numberOfPlayersLabel setFont:[UIFont systemFontOfSize:16]];
        [self.contentView addSubview:self.numberOfPlayersLabel];
        
        //Tag is set in cellForRowAtIndexPath to use with the selector
        self.joinGameButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
        [self.joinGameButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        self.joinGameButton.layer.cornerRadius = 5;
        self.joinGameButton.clipsToBounds = YES;
        [self.joinGameButton.layer setBackgroundColor:[[UIColor colorWithRed:(22/255.0) green:(104/255.0) blue:(249/255.0) alpha:1.0] CGColor]];
        
        self.joinGameButton.titleLabel.font = [UIFont boldSystemFontOfSize:[UIFont systemFontSize]];
        [self.joinGameButton setTitle:@"Join" forState:UIControlStateNormal];
        [self.contentView addSubview:self.joinGameButton];
    }
    
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    
    
    CGRect backgroundFrame = self.contentView.bounds;
    self.background.frame = backgroundFrame;
    
    backgroundFrame.origin.x += kPadding;
    backgroundFrame.origin.y += kPadding/2;
    backgroundFrame.size.width -= 2*kPadding;
    backgroundFrame.size.height -= kPadding;
    self.innerBackground.frame = backgroundFrame;
    
    CGRect gameNameFrame = backgroundFrame;
    gameNameFrame.origin.y += kPadding;
    gameNameFrame.size.height = kLabelHeight;
    gameNameFrame.origin.x += kPadding*2;
    gameNameFrame.size.width -= 2*kPadding;
    self.gameNameLabel.frame = gameNameFrame;
    
    CGRect numberOfPlayersFrame = gameNameFrame;
    numberOfPlayersFrame.size.height = kLabelHeight/2;
    numberOfPlayersFrame.size.width = kTextWidth;
    numberOfPlayersFrame.origin.y += kLabelHeight;
    self.numberOfPlayersLabel.frame = numberOfPlayersFrame;
    
    CGRect joinGameButtonFrame = backgroundFrame;
    joinGameButtonFrame.size.height = kButtonHeight;
    joinGameButtonFrame.size.width = kButtonWidth;
    joinGameButtonFrame.origin.y = self.background.frame.size.height/2 - kButtonHeight/2;
    joinGameButtonFrame.origin.x = backgroundFrame.size.width - kButtonWidth - kPadding;
    self.joinGameButton.frame = joinGameButtonFrame;
}

+ (CGFloat)cellHeight
{
    return kLabelHeight*3/2 + 4*kPadding;
}

- (void)prepareForReuse
{
    /*   Keep this as is   */
    self.gameNameLabel.text = @"";
    self.numberOfPlayersLabel.text = @"";
}

@end

@interface CreateGameTableViewCell : UITableViewCell

@property (nonatomic, strong) UIView* background;
@property (nonatomic, strong) UIView* innerBackground;
@property (nonatomic, strong) UILabel *introLabel;
@property (nonatomic, strong) UITextField *createGameName;
@property (nonatomic, strong) UIButton* createGameButton;

@end

@implementation CreateGameTableViewCell

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
        
        self.introLabel = [[UILabel alloc] init];
        [self.introLabel setFont:[UIFont systemFontOfSize:22]];
        self.introLabel.numberOfLines = 2;
        [self.introLabel setTextAlignment:NSTextAlignmentCenter];
        [self.introLabel setText:@"You have no ongoing games. Pick a game to join or Create a Game!"];
        [self.contentView addSubview:self.introLabel];
        
        _createGameName = [[UITextField alloc] init];
        _createGameName.textAlignment = NSTextAlignmentCenter;
        [_createGameName setBorderStyle:UITextBorderStyleRoundedRect];
        [_createGameName setPlaceholder:@"Omar's Occults"];
        _createGameName.autocapitalizationType = UITextAutocapitalizationTypeNone;
        [self.contentView addSubview:_createGameName];
        
        _createGameButton = [[UIButton alloc] init];
        _createGameButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
        [_createGameButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
        _createGameButton.layer.cornerRadius = 5;
        _createGameButton.clipsToBounds = YES;
        [_createGameButton.layer setBackgroundColor:[[UIColor colorWithRed:(22/255.0) green:(104/255.0) blue:(249/255.0) alpha:1.0] CGColor]];
        _createGameButton.titleLabel.font = [UIFont boldSystemFontOfSize:[UIFont systemFontSize]];
        [_createGameButton setTitle:@"Create Game" forState:UIControlStateNormal];
        [self.contentView addSubview:_createGameButton];
    }
    
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    
    
    CGRect backgroundFrame = self.contentView.bounds;
    self.background.frame = backgroundFrame;
    
    backgroundFrame.origin.x += kPadding;
    backgroundFrame.origin.y += 2*kPadding;
    backgroundFrame.size.width -= 2*kPadding;
    backgroundFrame.size.height -= 4*kPadding;
    self.innerBackground.frame = backgroundFrame;
    
    CGRect introLabelFrame = backgroundFrame;
    introLabelFrame.origin.y += kPadding/2;
    introLabelFrame.size.height = kLabelHeight*2;
    introLabelFrame.origin.x += kPadding;
    introLabelFrame.size.width -= 2*kPadding;
    self.introLabel.frame = introLabelFrame;
    
    CGRect createGameNameFrame = introLabelFrame;
    createGameNameFrame.origin.y += kPadding/2 + introLabelFrame.size.height;
    createGameNameFrame.size.height = kLabelHeight;
    self.createGameName.frame = createGameNameFrame;
    
    CGRect createGameButtonFrame = createGameNameFrame;
    createGameButtonFrame.origin.y += kPadding/2 + kLabelHeight;
    createGameButtonFrame.size.height = kLabelHeight;
    self.createGameButton.frame = createGameButtonFrame;
}

+ (CGFloat)cellHeight
{
    return kLabelHeight*4 + 7*kPadding;
}

- (void)prepareForReuse
{
    /*   Keep this as is   */
}

@end

@interface LobbyTableViewController ()

@end


@implementation LobbyTableViewController

- (void)textFieldDidEndEditing:(UITextField *)textField {
    _gameName = textField.text;
    [textField resignFirstResponder];
}
- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    _gameName = textField.text;
    [textField resignFirstResponder];
    return YES;
}

-(void) joinGameButtonPressed:(UIButton*)sender
{
    GameObject* currentObj = _data[sender.tag];
    NSMutableDictionary* gameInfo = [[NSMutableDictionary alloc] init];
    [gameInfo setObject:currentObj.gameName forKey:@"gameName"];
    
    DeadeuceCaller* model = [DeadeuceCaller sharedInstance];
    model.delegate = self;
    [gameInfo setObject:[model getUserID] forKey:@"email"];
    [gameInfo setObject:@"1234" forKey:@"name"];
    [model joinGame:gameInfo];
}

-(void) createGameButtonPressed:(UIButton*)sender
{
    [self.view endEditing:YES];
    if(![_gameName isEqualToString:@""]){//this does not update properly
        NSMutableDictionary* gameInfo = [[NSMutableDictionary alloc] init];
        [gameInfo setObject:_gameName forKey:@"gameName"];
        
        DeadeuceCaller* model = [DeadeuceCaller sharedInstance];
        model.delegate = self;
        [gameInfo setObject:[model getUserID] forKey:@"hostID"];
        [model createGame:gameInfo];
    }
}

- (instancetype)initWithStyle:(UITableViewStyle)style
{
    if (self = [super initWithStyle:style])
    {
        _gameName = [[NSString alloc] init];
        [self.tableView registerClass:[LobbyTableViewCell class] forCellReuseIdentifier:@"LobbyTableViewCell"];
        [self.tableView registerClass:[CreateGameTableViewCell class] forCellReuseIdentifier:@"CreateGameTableViewCell"];
        self.tableView.estimatedRowHeight = [LobbyTableViewCell cellHeight];
        self.tableView.rowHeight = [LobbyTableViewCell cellHeight];
        self.navigationItem.title = @"Lobby";
        self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
        
        _data = [[NSMutableArray alloc] init];
    }
    
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    [self.navigationItem setHidesBackButton:YES animated:YES];

    // Uncomment the following line to preserve selection between presentations.
    // self.clearsSelectionOnViewWillAppear = NO;
    
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
}

-(void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
    self.revealViewController.panGestureRecognizer.enabled=NO;
    DeadeuceCaller* model = [DeadeuceCaller sharedInstance];
    model.delegate = self;
    [model getGames];
}

-(void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    self.revealViewController.panGestureRecognizer.enabled=YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Deadeuce Delegate

-(void)listOfGames:(NSDictionary *)payload
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [_data removeAllObjects];
        NSArray* newData = [payload objectForKey:@"gamesList"];
        for(int i = 0; i < newData.count; i++){
            NSDictionary* singleGame = newData[i];
            NSString* gameName = [singleGame objectForKey:@"gameName"];
            NSInteger numberOfPlayers = [[singleGame objectForKey:@"numberOfPlayers"] integerValue];
            GameObject* obj = [[GameObject alloc] initWithGameName:gameName andNumberOfPlayers:numberOfPlayers];
            [_data addObject:obj];
        }
        [self.tableView reloadData];
    });
}
-(void) joinedGame:(BOOL)joined withGameID:(NSString*)gameID
{
    if(joined){
        [[DeadeuceCaller sharedInstance] setGameID:gameID];
        dispatch_queue_t queue = dispatch_queue_create("myqueue", NULL);
        dispatch_async(queue, ^{
            // Perform on main thread/queue
            dispatch_async(dispatch_get_main_queue(), ^{
                CurrentGameViewController *cGVc = [[CurrentGameViewController alloc] init];
                [self.navigationController pushViewController:cGVc animated:YES];
            });
        });
    }
}

-(void) createdGame:(NSString*)gameID
{
    [[DeadeuceCaller sharedInstance] setGameID:gameID];
    dispatch_queue_t queue = dispatch_queue_create("myqueue", NULL);
    dispatch_async(queue, ^{
        // Perform on main thread/queue
        dispatch_async(dispatch_get_main_queue(), ^{
            CurrentGameViewController *cGVc = [[CurrentGameViewController alloc] init];
            [self.navigationController pushViewController:cGVc animated:YES];
        });
    });
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [_data count] + 1;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath
{
    CGFloat cellHeight;
    
    if (indexPath.row == 0){
        cellHeight = [CreateGameTableViewCell cellHeight];
    } else {
        cellHeight = [LobbyTableViewCell cellHeight];
    }
    
    return cellHeight;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    //Intro cell
    if(indexPath.row == 0){
        CreateGameTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"CreateGameTableViewCell" forIndexPath:indexPath];
        cell.createGameName.delegate = self;
        [cell.createGameButton addTarget:self
                                action:@selector(createGameButtonPressed:)
                      forControlEvents:UIControlEventTouchUpInside];
        [cell setSelectionStyle:UITableViewCellSelectionStyleNone];
        
        return cell;
    }
    
    //Normal cell
    LobbyTableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"LobbyTableViewCell" forIndexPath:indexPath];
    
    GameObject *obj = _data[indexPath.row -1];
    
   // NSLog(@"%@", obj.gameName);
    cell.gameNameLabel.text = obj.gameName;
    
    //TODO this should be the game ID not just the row
    cell.joinGameButton.tag = indexPath.row - 1;
    [cell.joinGameButton addTarget:self
                            action:@selector(joinGameButtonPressed:)
                  forControlEvents:UIControlEventTouchUpInside];
    cell.numberOfPlayersLabel.text = [NSString stringWithFormat:@"Number of players: %ld/6", obj.numberOfPlayers];
    [cell setSelectionStyle:UITableViewCellSelectionStyleNone];
    
    return cell;
}


@end
