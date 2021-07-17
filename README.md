# home-display

Web app for our home display, to show pictures and videos.

## Setting up Raspberry Pi

1. Install RaspbianOS Lite (headless) using the official Raspberry Pi Imager tool
2. Update the OS:

```bash
sudo apt-get update
sudo apt-get upgrade
```

3. Install X-Server and Openbox (window manager):

```bash
sudo apt-get install --no-install-recommends xserver-xorg x11-xserver-utils xinit openbox
```

4. Install Chromium browser:

```bash
sudo apt-get install --no-install-recommends chromium-browser
```

5. Configure Openbox by editing:
   `/etc/xdg/openbox/autostart`

And replacing the file content with:

```python
# Disable any form of screen saver / screen blanking / power management
xset s off
xset s noblank
xset -dpms

# Allow quitting the X server with CTRL-ATL-Backspace
setxkbmap -option terminate:ctrl_alt_bksp

# Start Chromium in kiosk mode
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' ~/.config/chromium/'Local State'
sed -i 's/"exited_cleanly":false/"exited_cleanly":true/; s/"exit_type":"[^"]\+"/"exit_type":"Normal"/' ~/.config/chromium/Default/Preferences
chromium-browser --disable-infobars --kiosk 'http://your-url-here'
```

Change the url in the settings above to the URL of the display app

6. Edit `.bash_profile` and add:

```bash
[[ -z $DISPLAY && $XDG_VTNR -eq 1 ]] && startx -- -nocursor
```

7. Edit `/boot/config.txt` and:

- add `display_rotate=3`, to rotate the display accordingly (0 is default, 1 is 90°, 2 is 180°, 3 is 270°)
- uncomment the line with `disable_overscan=1`, if the screen has black borders
