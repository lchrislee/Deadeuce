//
//  SuggestTableViewController.m
//  Deadeuce
//
//  Created by Omar Khulusi on 4/2/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "SuggestTableViewController.h"
#import <SWRevealViewController.h>


@interface SuggestTableViewController ()

@end

@implementation SuggestTableViewController

-(void)dismiss:(id)sender
{
    [self.navigationController popViewControllerAnimated:YES];
}
-(void)nextButtonPressed:(id)sender
{
//    DetectivePadTableViewController * detectivePadVc = [[DetectivePadTableViewController alloc] initWithStyle:UITableViewStyleGrouped];
//    [self.navigationController pushViewController:detectivePadVc animated:YES];
}

- (instancetype)initWithStyle:(UITableViewStyle)style
{
    if (self = [super initWithStyle:style])
    {
        self.navigationItem.title = @"Suggest";
        self.sectionData = @[@"Location", @"Weapons", @"People"];
        self.locations = @[@"Ground Zero (you are currently here)", @"Lyon Center", @"Leavey Library",
                           @"Traddies", @"The 90", @"Bovard",
                           @"EVK", @"The Row", @"Campus Center"];
        self.weapons = @[@"empty soda cans", @"overly sharp skittles wrapper", @"tommy trojan's sword",
                         @"EVKitty's left paw", @"freshman on a longboard", @"rotten chanos nachos"];
        self.people = @[ @"Trina Gregory", @"Cody Kessler", @"Tommy Trojan",
                         @"Max Nikias", @"Will Ferrell", @"Bob Saget"];
        
        UIBarButtonItem * cancelButtonItem = [[UIBarButtonItem alloc] initWithImage:[UIImage imageNamed:@"X.png"]
                                                                              style:UIBarButtonItemStylePlain target:self action:@selector(dismiss:)];
        self.navigationItem.leftBarButtonItem = cancelButtonItem;
        UIBarButtonItem *nextButtonItem = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemDone target:self action:@selector(nextButtonPressed:)];
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
            text = self.locations[indexPath.row];
            break;
        case 1:
            text = self.weapons[indexPath.row];
            break;
        default:
            text = self.people[indexPath.row];
            break;
    }
    [cell.textLabel setText:text];
    
    return cell;
}

@end
