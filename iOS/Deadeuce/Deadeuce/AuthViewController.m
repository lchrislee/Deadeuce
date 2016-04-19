//
//  LoginViewController.m
//  HostelPass
//
//  Created by Omar Khulusi on 2/6/16.
//  Copyright © 2016 HostelPass. All rights reserved.
//

#import "LobbyTableViewController.h"
#import <SWRevealViewController.h>
#import "AuthViewController.h"

@interface AuthViewController ()

@property (nonatomic, strong) NSString* option; //Either "Login" or "Sign Up"

@property (nonatomic, strong) UILabel* emailLabel;
@property (nonatomic, strong) UITextField* emailTextField;

@property (nonatomic, strong) UILabel* passwordLabel;
@property (nonatomic, strong) UITextField *passwordTextField;

@property (nonatomic, strong) UILabel* passwordLabelConfirm;
@property (nonatomic, strong) UITextField *passwordTextFieldConfirm;

@property (nonatomic, strong) UIButton *submitButton;

@property (nonatomic, strong) UIImageView *bgImageView;


@end

@implementation AuthViewController

- (void)dismissModal
{
    [self.navigationController popViewControllerAnimated:YES];
}

- (instancetype)initWithOption:(NSString *)option
{
    if (self = [super init])
    {
        self.option = [option copy];
        
        self.navigationItem.title = [self.option capitalizedString];
        self.navigationItem.leftBarButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"Back" style:UIBarButtonItemStylePlain target:self action:@selector(dismissModal)];
    }
    
    return self;
}

-(void) login:(BOOL)success
{
    if(success){
        LobbyTableViewController *lVc = [[LobbyTableViewController alloc] initWithStyle:UITableViewStylePlain];
        [self.navigationController pushViewController:lVc animated:YES];
    }
}
-(void) signup:(BOOL)success
{
    if(success){
        LobbyTableViewController *lVc = [[LobbyTableViewController alloc] initWithStyle:UITableViewStylePlain];
        [self.navigationController pushViewController:lVc animated:YES];
    }
}

-(void) submitButtonPressed:(UIButton*)sender
{
    if([self.option isEqualToString:@"Login"]){
//        [self.model loginRequestWithEmail:self.emailTextField.text andPassword:self.passwordTextField.text];
    } else {
//        [self.model signupRequestWithEmail:self.emailTextField.text password:self.passwordTextField.text];
    }
}

- (void)textFieldDidEndEditing:(UITextField *)textField {
    [textField resignFirstResponder];
}
- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    [textField resignFirstResponder];
    return YES;
}

- (void)loadView
{
    self.view = [[UIView alloc] init];
    self.view.backgroundColor = [UIColor colorWithRed:(40/255.0) green:(192/255.0) blue:(149/255.0) alpha:1.0];
    
    CGRect screenRect = [[UIScreen mainScreen] bounds];
    CGFloat screenWidth = screenRect.size.width;
    CGFloat screenHeight = screenRect.size.height;
    
    CGRect bgFrame = CGRectMake(0.0,0.0,screenWidth,screenHeight);
    self.bgImageView = [[UIImageView alloc] initWithFrame:bgFrame];
    self.bgImageView.image=[UIImage imageNamed:@"cropdark-curve-forest-rails.png"];
    
    
    
    [self.view addSubview:_bgImageView];
    //Serious Hackathon quality right here
    if([self.option isEqualToString:@"Signup"]){
        //TODO ALEX ADD THE CONFIRM PASSWORD FIELD
        CGRect passwordLabelConfirmRect = CGRectMake(20.0, screenHeight/2.0 +44.0, screenWidth - 40.0, 44.0);
        self.passwordLabelConfirm = [[UILabel alloc] initWithFrame:passwordLabelConfirmRect];
        [self.passwordLabelConfirm setText:@"Confirm Password"];
        
        CGRect passwordTextFieldConfirmRect = CGRectMake(20.0, screenHeight/2.0 +88.0, screenWidth - 40.0, 44.0);
        self.passwordTextFieldConfirm = [[UITextField alloc] initWithFrame:passwordTextFieldConfirmRect];
        self.passwordTextFieldConfirm.delegate = self;
        self.passwordTextFieldConfirm.borderStyle = UITextBorderStyleRoundedRect;
        self.passwordTextFieldConfirm.placeholder = @"Comfirm Password";
        [self.passwordTextFieldConfirm setReturnKeyType:UIReturnKeyDone];
        
        
        
        [self.view addSubview:_passwordLabelConfirm];
        [self.view addSubview:_passwordTextFieldConfirm];
        
    }
    
    CGRect emailLabelRect = CGRectMake(20.0, screenHeight/2.0 - 200.0, screenWidth - 40.0, 44.0);
    self.emailLabel = [[UILabel alloc] initWithFrame:emailLabelRect];
    [self.emailLabel setText:@"Email"];
    
    //Init Email UITextField
    CGRect emailTextFieldRect = CGRectMake(20.0, screenHeight/2.0 - 166.0, screenWidth - 40.0, 44.0);
    self.emailTextField = [[UITextField alloc] initWithFrame:emailTextFieldRect];
    self.emailTextField.delegate = self;
    self.emailTextField.borderStyle = UITextBorderStyleRoundedRect;
    self.emailTextField.placeholder = @"example@example.com";
    [self.emailTextField setReturnKeyType:UIReturnKeyDone];
    
    CGRect passwordLabelRect = CGRectMake(20.0, screenHeight/2.0 -34.0, screenWidth - 40.0, 44.0);
    self.passwordLabel = [[UILabel alloc] initWithFrame:passwordLabelRect];
    [self.passwordLabel setText:@"Password"];
    
    //Init Password UITextField
    CGRect passwordTextFieldRect = CGRectMake(20.0, screenHeight/2.0 + 6.0, screenWidth - 40.0, 44.0);
    self.passwordTextField = [[UITextField alloc] initWithFrame:passwordTextFieldRect];
    self.passwordTextField.delegate = self;
    self.passwordTextField.borderStyle = UITextBorderStyleRoundedRect;
    self.passwordTextField.placeholder = @"Password";
    [self.passwordTextField setReturnKeyType:UIReturnKeyDone];
    
    [self.view addSubview:_emailLabel];
    [self.view addSubview:_emailTextField];
    [self.view addSubview:_passwordLabel];
    [self.view addSubview:_passwordTextField];
   
    
    //Submit Button
    self.submitButton = [UIButton buttonWithType:UIButtonTypeSystem];
    if([self.option isEqualToString:@"Sign Up"]){
        self.submitButton.alpha = 0.4;
    }
    [self.submitButton addTarget:self
                          action:@selector(submitButtonPressed:)
                forControlEvents:UIControlEventTouchUpInside];
    _submitButton.exclusiveTouch = YES;

    _submitButton.userInteractionEnabled = YES;

    [self.submitButton setTitle:self.option forState:UIControlStateNormal];
    [self.submitButton setUserInteractionEnabled:([self.option isEqualToString:@"Login"])];
    self.submitButton.frame = CGRectMake(0.0, screenHeight - 88.0, screenWidth, 44.0);
    
    [self.view addSubview:_submitButton];
}

- (void)viewDidLoad {
    [super viewDidLoad];
 
    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
