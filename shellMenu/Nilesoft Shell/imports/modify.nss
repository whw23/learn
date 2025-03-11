// modify items
// Remove items by identifiers
modify(mode=mode.multiple
	where=this.id(id.restore_previous_versions,id.cast_to_device)
	vis=vis.remove)

modify(type="recyclebin" where=window.is_desktop and this.id==id.empty_recycle_bin pos=1 sep)

modify(find="unpin*" pos="bottom" menu="Pin/Unpin")
modify(find="pin*" pos="top" menu="Pin/Unpin")

modify(where=this.id==id.copy_as_path menu="file manage")
modify(type="dir.back|drive.back" where=this.id==id.customize_this_folder pos=1 sep="top" menu="file manage")

// modify(where=str.equals(this.name, ["open in terminal", "open linux shell here"]) || this.id==id.open_powershell_window_here
// 	pos="bottom" menu="Terminal")

modify(where=str.equals(this.name, ["在终端中打开(T)", "在 Ubuntu 中打开", "Open Git GUI here","Open Git Bash here"]) pos="bottom" menu="终端(I)")

modify(where=str.equals(this.name, ["通过 Code 打开","通过 WindSurf 打开","通过 Trae 打开", "Open with IDEA", "Open with PyCharm","Open with Visual Studio"]) pos="bottom" menu="Editors")

modify(where=str.equals(this.name,["Unlock with File Locksmith","使用 PowerRename 重命名"]) pos="bottom" menu="PowerToys")

modify(mode=mode.multiple
	where=this.id(
		id.send_to,
		id.share,
		id.create_shortcut,
		id.set_as_desktop_background,
		id.rotate_left,
		id.rotate_right,
		id.map_network_drive,
		id.disconnect_network_drive,
		id.format,
		id.eject,
		id.give_access_to,
		id.include_in_library,
		id.print
	)
	pos=1 menu=title.more_options)
