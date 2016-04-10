//
//  SuggestTableViewController.m
//  Deadeuce
//
//  Created by Omar Khulusi on 4/2/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "SuggestTableViewController.h"
#import <SWRevealViewController.h>
#import "ReviewSuggestionViewController.h"

@interface SuggestTableViewController ()

@property NSInteger selectedLocationIndex;
@property NSInteger selectedWeaponIndex;
@property NSInteger selectedPersonIndex;

@end

@implementation SuggestTableViewController

-(void)dismiss:(id)sender
{
    [self.navigationController popViewControllerAnimated:YES];
}
-(void)nextButtonPressed:(id)sender
{
    ReviewSuggestionViewController * rSVc = [[ReviewSuggestionViewController alloc]
                                             initWithLocation:self.locations[_selectedLocationIndex]
                                             weapon:self.weapons[_selectedWeaponIndex]
                                             person:self.people[_selectedPersonIndex]];
    [self.navigationController pushViewController:rSVc animated:YES];
}

-(void) setGameCheckList: (NSDictionary *)gameCheckList
{
    NSLog(@"%@", gameCheckList);
    NSDictionary* checklist = [gameCheckList objectForKey:@"checkList"];
    
    _locations = [checklist objectForKey:@"locations"];
    _weapons = [checklist objectForKey:@"weapons"];
    _people = [checklist objectForKey:@"suspects"];
    [self.tableView reloadData];
}

- (instancetype)initWithStyle:(UITableViewStyle)style
{
    if (self = [super initWithStyle:style])
    {
        _selectedLocationIndex = -1;
        _selectedWeaponIndex = -1;
        _selectedPersonIndex = -1;
        
        self.navigationItem.title = @"Suggest";
        self.sectionData = @[@"Location", @"Weapons", @"People"];
        
        _locations = [[NSMutableArray alloc] init];
        _weapons = [[NSMutableArray alloc] init];
        _people = [[NSMutableArray alloc] init];
        DeadeuceCaller* model = [DeadeuceCaller sharedInstance];
        model.delegate = self;
        NSString * gameID = [model getGameID];
        [model getGameCheckList:@{@"gameID":gameID}];
        
        UIBarButtonItem * cancelButtonItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"X.png"]
                                                                              style:UIBarButtonItemStylePlain target:self action:@selector(dismiss:)];
        self.navigationItem.leftBarButtonItem = cancelButtonItem;
        
        UIBarButtonItem *nextButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"Next" style:UIBarButtonItemStyleDone target:self action:@selector(nextButtonPressed:)];
        [nextButtonItem setEnabled:NO];
        self.navigationItem.rightBarButtonItem = nextButtonItem;
    }
    
    return self;
}

- (void)viewDidLoad {
    [super viewDidLoad];
}

-(void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    self.revealViewController.panGestureRecognizer.enabled=NO;
}

-(void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    self.revealViewController.panGestureRecognizer.enabled=YES;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return 3;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section
{
    return 44;
}

- (CGFloat)tableView:(UITableView*)tableView heightForFooterInSection:(NSInteger)section {
    return 1.0;
}

-(UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section
{
    UIView *view = [[UIView alloc] initWithFrame:CGRectMake(0.0, -1.0, tableView.frame.size.width, 44.0)];
    /* Hackathon Quality */
    UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(10.0, -1.0, tableView.frame.size.width, 44.0)];
    [label setFont:[UIFont boldSystemFontOfSize:20]];
    NSString *title =[self.sectionData objectAtIndex:section];
    /* Section header is in 0th index... */
    [label setText:title];
    [view addSubview:label];
    return view;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSInteger retVal = 3;
    switch(section)
    {
        case 0:
            retVal = self.locations.count;
            break;
        case 1:
            retVal = self.weapons.count;
            break;
        default:
            retVal = self.people.count;
            break;
    }
    return retVal;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    switch(indexPath.section)
    {
        case 0:
            _selectedLocationIndex = indexPath.row;
            break;
        case 1:
            _selectedWeaponIndex = indexPath.row;
            break;
        default:
            _selectedPersonIndex = indexPath.row;
            break;
    }
    
    if(_selectedPersonIndex != -1 && _selectedWeaponIndex != -1 && _selectedLocationIndex != -1){
        [self.navigationItem.rightBarButtonItem setEnabled:YES];
    }
    
    //Hackathon quality strikes again
    [tableView reloadData];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *cellIdentifier = @"Cell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    
    if (!cell) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    
    NSString* text = @"A Cell";
    switch(indexPath.section)
    {
        case 0:
            if(_selectedLocationIndex == indexPath.row){
                [cell.imageView setImage:[UIImage imageNamed:@"selected.png"]];
            } else {
                [cell.imageView setImage:nil];
            }
            text = self.locations[indexPath.row];
            break;
        case 1:
            if(_selectedWeaponIndex == indexPath.row){
                [cell.imageView setImage:[UIImage imageNamed:@"selected.png"]];
            } else {
                [cell.imageView setImage:nil];
            }
            text = self.weapons[indexPath.row];
            break;
        default:
            if(_selectedPersonIndex == indexPath.row){
                [cell.imageView setImage:[UIImage imageNamed:@"selected.png"]];
            } else {
                [cell.imageView setImage:nil];
            }
            text = self.people[indexPath.row];
            break;
    }
    [cell.textLabel setText:text];
    
    return cell;
}

@end
