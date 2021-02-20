const test = {
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Action: [
        'cognito-idp:ListUsers',
        'cognito-idp:AdminLinkProviderForUser',
        'cognito-idp:AdminCreateUser',
        'cognito-idp:AdminSetUserPassword',
      ],
      Resource: {
        'Fn::Sub': [
          'arn:aws:cognito-idp:${region}:${account}:*',
          {
            region: {
              Ref: 'AWS::Region',
            },
            account: {
              Ref: 'AWS::AccountId',
            },
          },
        ],
      },
    },
  ],
};
