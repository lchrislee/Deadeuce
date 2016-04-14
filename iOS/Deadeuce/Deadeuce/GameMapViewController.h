//
//  GameMapViewController.h
//  Deadeuce
//
//  Created by Omar Khulusi on 3/29/16.
//  Copyright © 2016 Deadeuce. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DeadeuceCaller.h"

@interface GameMapViewController : UIViewController<UICollectionViewDataSource,UICollectionViewDelegateFlowLayout, DeadeuceDelegate>
{
    UICollectionView* _collectionView;
}

@end
