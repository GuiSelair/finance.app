import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptProvider from './HashProvider/implementations/BCryptProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptProvider);
