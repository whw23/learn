# wsl2

https://segmentfault.com/a/1190000038967921

##  xface4
```bash
sudo apt-get install xfce4
```

Set environment ~/.bashrc
```bash
sudo nano ~/.bashrc
```
```bash
# xfce4
export DISPLAY=$(awk '/nameserver / {print $2; exit}' /etc/resolv.conf 2>/dev/null):0.0
export LIBGL_ALWAYS_INDIRECT=1
export LANG=zh_CN.UTF-8
```

```bash
echo "<passwordOfSudo>" | sudo -S startxfce4
```

## XLaunch
用于显示桌面
