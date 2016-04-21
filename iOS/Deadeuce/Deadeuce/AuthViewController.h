//
//  AuthViewController.h
//  HostelPass
//
//  Created by Omar Khulusi on 2/14/16.
//  Copyright © 2016 HostelPass. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DeadeuceCaller.h"

@interface AuthViewController : UIViewController<UITextFieldDelegate, DeadeuceDelegate>

-(instancetype)initWithOption:(NSString*)option;

@end
