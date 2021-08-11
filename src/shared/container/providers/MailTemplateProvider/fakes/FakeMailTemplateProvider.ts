/* eslint-disable @typescript-eslint/no-unused-vars */
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Conteúdo do e-mail';
  }
}

export default FakeMailTemplateProvider;
