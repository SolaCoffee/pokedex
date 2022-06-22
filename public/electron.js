th = require('path')

const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        heigth: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadURL(
        isDev
            ? ' http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    /**
     * Si environnemenet de developpement
     */
    if (isDev) {
        /**
         * Ouvrir outils de developpement (F12)
         */
        win.webContents.openDevTools({ mode: 'detach' })
    }
}

    /**
     * Une fois que l'app est prete, on utilise la fonction createWindow ci-dessus
     */
    app.whenReady().then(createWindow)

    /**
     * Une fois que toutes les fenetres sont fermes
     */
    app.on('window-all-closed', () => {
        /**
         * Si la plateforme n'est pas MacOS
         */
        if (process.platform !== 'darwin') {
            /**
             * On quitte l'application
            */
            app.quit()
        }
    });

    /**
     * Une fois que l'application est activee
     */
    app.on('activate', () => {

        /** 
         * Si l'objet retourne par getAllWindows() est vide
         */
        if(BrowserWindow.getAllWindows().length === 0) {
            /**
             * Creation de fenetre
             */
            createWindow()
        }
    });

