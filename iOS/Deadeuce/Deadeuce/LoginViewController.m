//
//  LoginViewController.m
//  Deadeuce
//
//  Created by Omar Khulusi on 3/11/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "LoginViewController.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import "LobbyTableViewController.h"
#import <SWRevealViewController.h>

@interface LoginViewController ()

@property (nonatomic, strong) UIButton *submitButton;

@end

@implementation LoginViewController

- (void)submitButtonPressed:(UIButton*)sender {
    LobbyTableViewController *lVc = [[LobbyTableViewController alloc] initWithStyle:UITableViewStylePlain];
    
    [self.navigationController pushViewController:lVc animated:YES];
}

// Once the button is clicked, show the login dialog
-(void)loginButtonClicked:(UIButton*)sender
{
    FBSDKLoginManager *login = [[FBSDKLoginManager alloc] init];
    [login
     logInWithReadPermissions: @[@"public_profile"]
     fromViewController:self
     handler:^(FBSDKLoginManagerLoginResult *result, NSError *error) {
         if (error) {
             NSLog(@"Process error");
         } else if (result.isCancelled) {
             NSLog(@"Cancelled");
         } else {
             LobbyTableViewController *lVc = [[LobbyTableViewController alloc] initWithStyle:UITableViewStylePlain];
             [self.navigationController pushViewController:lVc animated:YES];
         }
     }];
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
    [self.submitButton.layer setBackgroundColor:[[UIColor colorWithRed:(44/255.0) green:(67/255.0) blue:(136/255.0) alpha:1.0] CGColor]];
    
    UIImageView *customView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"facebook.png"]];
    customView.frame = CGRectMake(28.0, 13.0, 34.0, 34.0);
    [self.submitButton addSubview:customView];
    
    [self.submitButton addTarget:self
                          action:@selector(loginButtonClicked:)
                forControlEvents:UIControlEventTouchUpInside];
    [self.submitButton setTitle:@"Login with Facebook" forState:UIControlStateNormal];
    self.submitButton.contentHorizontalAlignment = UIControlContentHorizontalAlignmentRight;
    self.submitButton.contentEdgeInsets = UIEdgeInsetsMake(0, 0, 0, 30.0);
    self.submitButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:22.0];
    self.submitButton.frame = CGRectMake(20.0, screenHeight - 188.0, screenWidth - 40.0, 60.0);
    
    UILabel *titleLabel = [[UILabel alloc] init];
    [titleLabel setFrame:CGRectMake(20.0, screenHeight/2 - 164.0, screenWidth - 40.0, 88.0)];
    titleLabel.backgroundColor=[UIColor clearColor];
    titleLabel.textColor=[UIColor blackColor];
    titleLabel.userInteractionEnabled = NO;
    titleLabel.textAlignment = NSTextAlignmentCenter;
    
    titleLabel.text= @"Deadeuce";
    [titleLabel setFont:[UIFont fontWithName:@"HelveticaNeue" size:50]];
    
    [self.view addSubview:titleLabel];
    
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
        SWRevealViewController *revealController = [self revealViewController];
        revealController.panGestureRecognizer.enabled = NO;
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
