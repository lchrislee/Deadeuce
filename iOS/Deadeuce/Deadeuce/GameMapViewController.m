//
//  GameMapViewController.m
//  Deadeuce
//
//  Created by Omar Khulusi on 3/29/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "GameMapViewController.h"
#import <SWRevealViewController.h>

@interface GameMapCollectionViewCell : UICollectionViewCell

@property (nonatomic, strong) UIView* boundingBox;

@property (nonatomic, strong) UIView* header;
@property (nonatomic, strong) UILabel* headerLabel;

@property (nonatomic, strong) UIView* bottomBox;
@property (nonatomic, strong) UIView* innerBackground;
@property (nonatomic, strong) UILabel *mainLabel;

@end

@implementation GameMapCollectionViewCell

const CGFloat kMainLabelHeight = 36;
const CGFloat kHeaderHeight = 40;
const CGFloat kMPadding = 3;

-(instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame])
    {
        self.boundingBox = [[UIView alloc] init];
        [self.contentView addSubview:self.boundingBox];
        
        self.header = [[UIView alloc] init];
        self.header.backgroundColor = [UIColor colorWithRed:(52/255.0) green:(52/255.0) blue:(52/255.0) alpha:1.0];
        [self.contentView addSubview:self.header];
        
        self.headerLabel = [[UILabel alloc] init];
        [self.headerLabel setFont:[UIFont systemFontOfSize:12]];
        [self.headerLabel setTextAlignment:NSTextAlignmentCenter];
        [self.headerLabel setTextColor:[UIColor whiteColor]];
        [self.headerLabel setText:@"EVK"];
        [self.contentView addSubview:self.headerLabel];
        
        self.bottomBox = [[UIView alloc] init];
        self.bottomBox.backgroundColor =
        [UIColor colorWithRed:(132/255.0) green:(132/255.0) blue:(132/255.0) alpha:1.0];
        [self.contentView addSubview:self.bottomBox];
        
        self.innerBackground = [[UIView alloc] init];
        self.innerBackground.backgroundColor =
            [UIColor colorWithRed:(193/255.0) green:(193/255.0) blue:(193/255.0) alpha:1.0];
        [self.contentView addSubview:self.innerBackground];
        
        self.mainLabel = [[UILabel alloc] init];
        [self.mainLabel setFont:[UIFont systemFontOfSize:12]];
        [self.mainLabel setTextAlignment:NSTextAlignmentCenter];
        [self.mainLabel setText:@"-"];
        [self.contentView addSubview:self.mainLabel];
    }
    return self;
}

- (void)layoutSubviews
{
    [super layoutSubviews];
    
    CGRect boundingBoxFrame = self.contentView.bounds;
    CGRect headerFrame = boundingBoxFrame;
    CGRect bottomFrame = boundingBoxFrame;
    self.boundingBox.frame = boundingBoxFrame;
    
    headerFrame.size.height = kHeaderHeight;
    self.header.frame = headerFrame;
    self.headerLabel.frame = headerFrame;
    
    bottomFrame.origin.y += kHeaderHeight;
    bottomFrame.size.height -= kHeaderHeight;
    self.bottomBox.frame = bottomFrame;
    
    CGRect innerBackgroundFrame = bottomFrame;
    innerBackgroundFrame.origin.x += kMPadding;
    innerBackgroundFrame.origin.y += kMPadding;
    innerBackgroundFrame.size.width -= 2*kMPadding;
    innerBackgroundFrame.size.height -= 2*kMPadding;
    self.innerBackground.frame = innerBackgroundFrame;
    
    CGRect mainLabelFrame = bottomFrame;
    mainLabelFrame.origin.y += kMPadding/2;
    mainLabelFrame.size.height = kMainLabelHeight*2;
    mainLabelFrame.origin.x += kMPadding;
    mainLabelFrame.size.width -= 2*kMPadding;
    self.mainLabel.frame = mainLabelFrame;
}

+ (CGFloat)cellHeight
{
    return kHeaderHeight + kMainLabelHeight*3 + 2*kMPadding;
}

- (void)prepareForReuse
{
    /*   Keep this as is   */
    self.headerLabel.text = @"Title";
    self.mainLabel.text = @"Name";
}

@end

@interface GameMapViewController ()

@property (nonatomic, strong) UILabel *currentGameLabel;
@property (nonatomic, strong) UILabel *currentGameValueLabel;

@property (nonatomic, strong) NSMutableArray * locations;

@end

@implementation GameMapViewController

-(void)toggle:(id)sender
{
    [self.revealViewController revealToggleAnimated:YES];
}

- (instancetype)init
{
    if (self = [super init])
    {
        self.navigationItem.title = @"Game Map";
        //Add an image to your project & set that image here.
        UIBarButtonItem *revealButtonItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"reveal-icon.png"]
                                                                             style:UIBarButtonItemStylePlain target:self action:@selector(toggle:)];
        self.navigationItem.leftBarButtonItem = revealButtonItem;
        
        _locations = [[NSMutableArray alloc] init];
        DeadeuceCaller* model = [DeadeuceCaller sharedInstance];
        model.delegate = self;
        NSString * gameID = [model getGameID];
        [model getGameMap:@{@"gameID":gameID}];
    }
    
    return self;
}

- (void)loadView
{
    self.view = [[UIView alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    self.view.backgroundColor = [UIColor colorWithRed:(231/255.0) green:(232/255.0) blue:(231/255.0) alpha:1.0];
    
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    CGFloat screenWidth = screenRect.size.width;
    
    CGFloat startingHeight = self.navigationController.navigationBar.frame.size.height + 20.0;
    
    self.currentGameLabel = [[UILabel alloc] init];
    [self.currentGameLabel setFrame:CGRectMake(20.0, startingHeight + 5.0, screenWidth - 40.0, 40.0)];
    self.currentGameLabel.backgroundColor=[UIColor clearColor];
    self.currentGameLabel.textColor=[UIColor blackColor];
    self.currentGameLabel.userInteractionEnabled = NO;
    self.currentGameLabel.textAlignment = NSTextAlignmentLeft;
    self.currentGameLabel.text= @"Current Game:";
    [self.currentGameLabel setFont:[UIFont fontWithName:@"HelveticaNeue" size:22]];
    [self.view addSubview:self.currentGameLabel];
    
    if(!_currentGameValueLabel){
        self.currentGameValueLabel = [[UILabel alloc] init];
    }
    [self.currentGameValueLabel setFrame:CGRectMake(20.0, startingHeight + 50.0, screenWidth - 40.0, 40.0)];
    self.currentGameValueLabel.backgroundColor=[UIColor clearColor];
    self.currentGameValueLabel.textColor=[UIColor colorWithRed:(37/255.0) green:(36/255.0) blue:(45/255.0) alpha:1.0];
    self.currentGameValueLabel.userInteractionEnabled = NO;
    self.currentGameValueLabel.layer.cornerRadius = 5;
    self.currentGameValueLabel.clipsToBounds = YES;
    [self.currentGameValueLabel.layer setBackgroundColor:[[UIColor colorWithRed:(193/255.0) green:(193/255.0) blue:(193/255.0) alpha:1.0] CGColor]];
    self.currentGameValueLabel.textAlignment = NSTextAlignmentCenter;
    [self.currentGameValueLabel setFont:[UIFont fontWithName:@"HelveticaNeue" size:22]];
    [self.view addSubview:self.currentGameValueLabel];
    
    
    CGRect collectionViewFrame = CGRectMake(0.0, startingHeight + 100.0, self.view.frame.size.width, [GameMapCollectionViewCell cellHeight]*3);
    UICollectionViewFlowLayout *layout=[[UICollectionViewFlowLayout alloc] init];
    _collectionView=[[UICollectionView alloc] initWithFrame:collectionViewFrame collectionViewLayout:layout];
    [_collectionView setDataSource:self];
    [_collectionView setDelegate:self];
    
    [_collectionView registerClass:[GameMapCollectionViewCell class] forCellWithReuseIdentifier:@"GameMapCollectionViewCell"];
    
    [self.view addSubview:_collectionView];
}

#pragma mark Deadeuce Delegate
-(void) setGameMap:(NSDictionary *)gameMapInfo
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(!_currentGameValueLabel){
            _currentGameValueLabel = [[UILabel alloc] init];
        }
        _currentGameValueLabel.text = [gameMapInfo objectForKey:@"gameName"];
        _locations = [gameMapInfo objectForKey:@"locations"];
        [_collectionView reloadData];
    });
}

#pragma mark UICollectionViewDelegate

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section
{
    return sqrt(_locations.count);
}

- (NSInteger)numberOfSectionsInCollectionView:(UICollectionView *)collectionView
{
    return sqrt(_locations.count);
}

// The cell that is returned must be retrieved from a call to -dequeueReusableCellWithReuseIdentifier:forIndexPath:
- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath
{
    GameMapCollectionViewCell *cell=[collectionView dequeueReusableCellWithReuseIdentifier:@"GameMapCollectionViewCell" forIndexPath:indexPath];
    NSDictionary* obj = self.locations[indexPath.section*[collectionView numberOfItemsInSection:indexPath.section]+indexPath.item];
    cell.headerLabel.text = [obj objectForKey:@"name"];
    
    cell.mainLabel.numberOfLines = 0;
    NSMutableString* mainLabel = [[NSMutableString alloc] initWithString:@""];
    NSArray* players = [obj objectForKey:@"players"];
    if(players){
        for(int i = 0; i < players.count; i++){
            [mainLabel appendString:players[i]];
            [mainLabel appendString:@"\n"];
        }
        cell.mainLabel.text = mainLabel;
    } else {
        cell.mainLabel.text = @"-";
    }
    
    return cell;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView
                   layout:(UICollectionViewLayout *)collectionViewLayout
minimumLineSpacingForSectionAtIndex:(NSInteger)section
{
    return 0.0;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView
                   layout:(UICollectionViewLayout *)collectionViewLayout
minimumInteritemSpacingForSectionAtIndex:(NSInteger)section
{
    return 0.0;
}

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout*)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath
{
    return CGSizeMake(self.view.frame.size.width/3, floor([GameMapCollectionViewCell cellHeight]));
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
