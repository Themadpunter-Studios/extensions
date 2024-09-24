(function(Scratch) {
    'use strict';

    // Load the JSEncrypt library from a CDN
    const script = document.createElement('script');
    script.src = 'data:text/plain;base64,LyohIEZvciBsaWNlbnNlIGluZm9ybWF0aW9uIHBsZWFzZSBzZWUganNlbmNyeXB0Lm1pbi5qcy5MSUNFTlNFLnR4dCAqLw0KIWZ1bmN0aW';
    document.head.appendChild(script);

    class RSAExtension {
        getInfo() {
            return {
                id: 'rsa',
                name: 'RSA',
                color1: '#FF0000', // Primary color (red)
                color2: '#CC0000', // Secondary color (darker red)
                blocks: [
                    {
                        opcode: 'generateKeys',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Generate RSA keys',
                        arguments: {}
                    },
                    {
                        opcode: 'encrypt',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Encrypt [TEXT] with public key [KEY]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello, world!'
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'decrypt',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Decrypt [TEXT] with private key [KEY]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'sign',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Sign [TEXT] with private key [KEY]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello, world!'
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'verify',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Verify [TEXT] with signature [SIGNATURE] and public key [KEY]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello, world!'
                            },
                            SIGNATURE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    }
                ]
            };
        }

        generateKeys() {
            const crypt = new JSEncrypt({ default_key_size: 1024 });
            const publicKey = crypt.getPublicKeyB64();
            const privateKey = crypt.getPrivateKeyB64();
            return JSON.stringify({ publicKey, privateKey });
        }

        encrypt(args) {
            const crypt = new JSEncrypt();
            crypt.setPublicKey(args.KEY);
            const encrypted = crypt.encrypt(args.TEXT);
            return encrypted ? btoa(encrypted) : 'Encryption failed';
        }

        decrypt(args) {
            const crypt = new JSEncrypt();
            crypt.setPrivateKey(args.KEY);
            const decrypted = crypt.decrypt(atob(args.TEXT));
            return decrypted ? decrypted : 'Decryption failed';
        }

        sign(args) {
            const crypt = new JSEncrypt();
            crypt.setPrivateKey(args.KEY);
            const signature = crypt.sign(args.TEXT, CryptoJS.SHA256, "sha256");
            return signature ? btoa(signature) : 'Signing failed';
        }

        verify(args) {
            const crypt = new JSEncrypt();
            crypt.setPublicKey(args.KEY);
            const isValid = crypt.verify(args.TEXT, atob(args.SIGNATURE), CryptoJS.SHA256);
            return isValid;
        }
    }

    // Wait for the script to load before registering the extension
    script.onload = () => {
        Scratch.extensions.register(new RSAExtension());
    };
})(Scratch);
