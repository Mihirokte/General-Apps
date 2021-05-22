#cs ----------------------------------------------------------------------------

 AutoIt Version: 3.3.14.5
 Author:         myName

 Script Function:
	Template AutoIt script.

#ce ----------------------------------------------------------------------------

; Script Start - Add your code below here
Run("explorer")
WinWaitActive("File Explorer")
MouseClick("left",68,165,1)
WinWaitActive("Downloads")
MouseClick("left",216,175,2)
WinWaitActive("sample.txt - Notepad")
Send("Hello World")
WinClose("*sample.txt - Notepad")
WinWaitActive("Notepad", "Save")
Send("!n")
