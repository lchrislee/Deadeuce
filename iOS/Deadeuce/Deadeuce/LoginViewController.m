//
//  LoginViewController.m
//  Deadeuce
//
//  Created by Omar Khulusi on 3/11/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import "LoginViewController.h"
#import "AuthViewController.h"
#import <SWRevealViewController.h>

#import "DeadeuceCaller.h"

@interface LoginViewController ()

@property (nonatomic, strong) UIImageView *bgImageView;
@property (nonatomic, strong) UIImageView *logoImageView;
@property (nonatomic, strong) UIButton *loginButton;
@property (nonatomic, strong) UIButton *signupButton;

@end

@implementation LoginViewController

- (void)loginButtonPressed:(UIButton*)sender {
    AuthViewController *aVc = [[AuthViewController alloc] initWithOption:@"Login"];
    [self.navigationController pushViewController:aVc animated:YES];
}

// Once the button is clicked, show the login dialog
-(void)signupButtonPressed:(UIButton*)sender
{
    AuthViewController *aVc = [[AuthViewController alloc] initWithOption:@"Signup"];
    [self.navigationController pushViewController:aVc animated:YES];
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
    
    
    self.loginButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [self.loginButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.loginButton.layer.cornerRadius = 2;
    self.loginButton.clipsToBounds = YES;
    [self.loginButton.layer setBackgroundColor:[[UIColor colorWithRed:(223/255.0) green:(74/255.0) blue:(50/255.0) alpha:1.0] CGColor]];
    
    [self.loginButton addTarget:self
                         action:@selector(loginButtonPressed:)
               forControlEvents:UIControlEventTouchUpInside];
    [self.loginButton setTitle:@"Login" forState:UIControlStateNormal];
    self.loginButton.contentHorizontalAlignment = UIControlContentHorizontalAlignmentCenter;
    if (screenWidth < 340)
    {
        self.loginButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:17.0];
    } else {
        self.loginButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:22.0];
    }
    self.loginButton.frame = CGRectMake(20.0, screenHeight - 188.0, screenWidth - 40.0, 60.0);
    
    
    self.signupButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [self.signupButton setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
    self.signupButton.layer.cornerRadius = 2;
    self.signupButton.clipsToBounds = YES;
    [self.signupButton.layer setBackgroundColor:[[UIColor colorWithRed:(223/255.0) green:(74/255.0) blue:(50/255.0) alpha:1.0] CGColor]];
    
    [self.signupButton addTarget:self
                          action:@selector(signupButtonPressed:)
                forControlEvents:UIControlEventTouchUpInside];
    [self.signupButton setTitle:@"Sign Up" forState:UIControlStateNormal];
    self.signupButton.contentHorizontalAlignment = UIControlContentHorizontalAlignmentCenter;
    if (screenWidth < 340)
    {
        self.signupButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:17.0];
    }else{
        self.signupButton.titleLabel.font = [UIFont fontWithName:@"HelveticaNeue" size:22.0];
    }
    
    self.signupButton.frame = CGRectMake(20.0, screenHeight - 110.0, screenWidth - 40.0, 60.0);
    
    [self.view addSubview:_bgImageView];
    [self.view addSubview:_logoImageView];
    [self.view addSubview:_signupButton];
    [self.view addSubview:_loginButton];
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
