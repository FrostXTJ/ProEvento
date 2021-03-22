# ProEvento
ProEvento is a social media platform that offers live streaming functionality

## How to Use
1. Make sure [Node.js](https://nodejs.org/en/) is installed and its version is higher than `14.0.0`
2. Make sure [Yarn](https://yarnpkg.com/getting-started/install) is also installed. Conventionally, Yarn should by be automatically installed with Node.js.
3. Make sure [Expo CLI](https://expo.io/tools#cli) is installed globally. This is the tool that compiles and runs the React Native App.
4. (Optional) Install the IOS simulator from [Xcdode](https://developer.apple.com/xcode/) or Android emulator from [Android Studio](https://developer.android.com/studio). This step is optional because you may also test running the app on your web server or on a physical phone, more info on the [Expo website](https://expo.io/tools).
5. Navigate to `ProEvento/frontend/` directory, run
    ```
    yarn install
    ```

    and then 
    ```
    yarn start
    ```
    A Expo webpage will be opened in your broswer, you should be able to run the app on your IOS simulator/Android emulator/web/physical phone.
  
  *Special note: the streaming service is usually turned off by default to reduce the charges from the Twilio server. If you want to test the streaming service, please contact the repository owner.*
