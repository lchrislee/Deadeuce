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
#import <GoogleSignIn/GoogleSignIn.h>

#import "DeadeuceCaller.h"

@interface LoginViewController ()

@property (nonatomic, strong) UIImageView *bgImageView;
@property (nonatomic, strong) UIImageView *logoImageView;
@property (nonatomic, strong) UIButton *fbButton;
@property (nonatomic, strong) UIButton *googleButton;

@end

@implementation LoginViewController

- (void)fbButtonPressed:(UIButton*)sender {
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
    
    CGRect bgFrame = CGRectMake(0.0,0.0,screenWidth,screenHeight);
    self.bgImageView = [[UIImageView alloc] initWithFrame:bgFrame];
    self.bgImageView.image=[UIImage imageNamed:@"cropdark-curve-forest-rails.png"];
    
    
    CGRect logoFrame = CGRectMake(20.0, screenHeight/2 - 164.0, screenWidth - 40.0, 88.0);
    self.logoImageView = [[UIImageView alloc] initWithFrame:logoFrame];
    self.logoImageView.image=[UIImage imageNamed:@"griffy.regular.png"];
    
    
    self.fbButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [self.fbButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.fbButton.layer.cornerRadius = 5;
    self.fbButton.clipsToBounds = YES;
    [self.fbButton.layer setBackgroundColor:[[UIColor colorWithRed:(44/255.0) green:(67/255.0) blue:(136/255.0) alpha:1.0] CGColor]];
    
    
    UIImageView *customViewF = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"facebook.png"]];
    customViewF.frame = CGRectMake(28.0, 13.0, 34.0, 34.0);
    [self.fbButton addSubview:customViewF];
    
    [self.fbButton addTarget:self
                          action:@selector(loginButtonClicked:)
                forControlEvents:UIControlEventTouchUpInside];
    [self.fbButton setTitle:@"Login with Facebook" forState:UIControlStateNormal];
    self.fbButton.contentHorizontalAlignment = UIControlContentHorizontalAlignmentRight;
    self.fbButton.contentEdgeInsets = UIEdgeInsetsMake(0, 0, 0, 30.0);
    if (screenWidth < 340)
    {
        self.fbButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:17.0];
    }
    else
    {
        self.fbButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:22.0];
        
    }
    self.fbButton.frame = CGRectMake(20.0, screenHeight - 188.0, screenWidth - 40.0, 60.0);
    
    //google button
    
    self.googleButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [self.googleButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.googleButton.layer.cornerRadius = 5;
    self.googleButton.clipsToBounds = YES;
    [self.googleButton.layer setBackgroundColor:[[UIColor colorWithRed:(223/255.0) green:(74/255.0) blue:(50/255.0) alpha:1.0] CGColor]];
    
    UIImageView *customViewG = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"google_logo.png"]];
    customViewG.frame = CGRectMake(28.0, 13.0, 34.0, 34.0);
    [self.googleButton addSubview:customViewG];
    
    
    [self.googleButton addTarget:self
                          action:@selector(sI:)
                forControlEvents:UIControlEventTouchUpInside];
    [self.googleButton setTitle:@"Login with Google" forState:UIControlStateNormal];
    self.googleButton.contentHorizontalAlignment = UIControlContentHorizontalAlignmentRight;
    self.googleButton.contentEdgeInsets = UIEdgeInsetsMake(0, 0, 0, 46.0);
    if (screenWidth < 340)
    {
        self.googleButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:17.0];
    }else{
        self.googleButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:22.0];
    }
    
    self.googleButton.frame = CGRectMake(20.0, screenHeight - 110.0, screenWidth - 40.0, 60.0);

    
    //Original Title button
//    UILabel *titleLabel = [[UILabel alloc] init];
//    [titleLabel setFrame:CGRectMake(20.0, screenHeight/2 - 164.0, screenWidth - 40.0, 88.0)];
//    titleLabel.backgroundColor=[UIColor clearColor];
//    titleLabel.textColor=[UIColor blackColor];
//    titleLabel.userInteractionEnabled = NO;
//    titleLabel.textAlignment = NSTextAlignmentCenter;
//    
//    titleLabel.text= @"Deadeuce";
//    [titleLabel setFont:[UIFont fontWithName:@"HelveticaNeue" size:50]];
    
    [self.view addSubview:_bgImageView];
    [self.view addSubview:_logoImageView];
    [self.view addSubview:_googleButton];
    [self.view addSubview:_fbButton];
    //[self.view addSubview:titleLabel];

}

- (void)sI:(id) sender
{
    [[GIDSignIn sharedInstance] signIn];
    
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
    [[DeadeuceCaller sharedInstance] testSlice: @{@"Hello": @"World", @"TEST": @"RESULT"}];
    [GIDSignIn sharedInstance].uiDelegate = self;

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
