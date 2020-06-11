package com.maxreactnative;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback;
import com.facebook.react.modules.core.PermissionListener;

import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;

// import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;


// public class MainActivity extends ReactActivity {
public class MainActivity extends SplashActivity {
    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
        TextView textView = new TextView(this);

        view.setBackgroundColor(Color.parseColor("#521751"));
        view.setGravity(Gravity.CENTER);

        textView.setTextColor(Color.parseColor("#FA923F"));
        textView.setText("MaxReactNative");
        textView.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

        view.addView(textView);
        return view;
    }

    private PermissionListener listener;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    // @Override
    protected String getMainComponentName() {
        return "maxReactNative";
    }

    // @Override
    public void setPermissionListener(PermissionListener listener)
    {
        this.listener = listener;
    }

   // @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
    {
        if (listener != null)
        {
        listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

}
