//
//  AppDelegate.h
//  Deadeuce
//
//  Created by Omar Khulusi on 3/11/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <SWRevealViewController.h>
#import <GoogleSignIn/GoogleSignIn.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, GIDSignInDelegate, GIDSignInUIDelegate>

@property (strong, nonatomic) UIWindow *window;
@property (strong, nonatomic) SWRevealViewController *viewController;

@end

