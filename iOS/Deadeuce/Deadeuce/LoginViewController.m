//
//  LoginViewController.m
//  Deadeuce
//
//  Created by Omar Khulusi on 3/11/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "LoginViewController.h"
#import <FacebookSDK/FacebookSDK.h>
#import "LobbyTableViewController.h"

@interface LoginViewController ()

@property (nonatomic, strong) UIButton *submitButton;

@end

@implementation LoginViewController

- (void)submitButtonPressed:(UIButton*)sender {
    LobbyTableViewController *lVc = [[LobbyTableViewController alloc] initWithStyle:UITableViewStylePlain];
    
    [self.navigationController pushViewController:lVc animated:YES];
}
- (void)loadView {
    self.view = [[UIView alloc] init];
    self.view.backgroundColor = [UIColor colorWithRed:(233/255.0) green:(234/255.0) blue:(229/255.0) alpha:1.0];
    
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    CGFloat screenWidth = screenRect.size.width;
    CGFloat screenHeight = screenRect.size.height;
    
    self.submitButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [self.submitButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.submitButton.layer.cornerRadius = 5;
    self.submitButton.clipsToBounds = YES;
    [self.submitButton.layer setBorderWidth:1.0];
    [self.submitButton.layer setBorderColor:[[UIColor colorWithRed:(40/255.0) green:(177/255.0) blue:(134/255.0) alpha:1.0] CGColor]];
    [self.submitButton.layer setBackgroundColor:[[UIColor colorWithRed:(40/255.0) green:(177/255.0) blue:(134/255.0) alpha:1.0] CGColor]];
    
    [self.submitButton addTarget:self
                          action:@selector(submitButtonPressed:)
                forControlEvents:UIControlEventTouchUpInside];
    [self.submitButton setTitle:@"Login" forState:UIControlStateNormal];
    self.submitButton.frame = CGRectMake(20.0, screenHeight - 188.0, screenWidth - 40.0, 44.0);
    
    [self.view addSubview:_submitButton];
}

- (void)viewWillAppear:(BOOL)animated {
    [self.navigationController setNavigationBarHidden:YES animated:animated];
    [super viewWillAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated {
    [self.navigationController setNavigationBarHidden:NO animated:animated];
    [super viewWillDisappear:animated];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Do any additional setup after loading the view.
}

- (instancetype)init
{
    if (self = [super init])
    {
        self.navigationItem.title = @"Login";
    }
    
    return self;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
