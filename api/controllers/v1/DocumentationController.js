import path from 'path';
import YAML from 'yamljs';

function readJsonFileSync(filepath, encoding) {
  const yamlDocs = YAML.load(filepath);
  return yamlDocs;
}
module.exports = {
  getDocumentationJson(req, res) {
    return res.status(200).jsonx(readJsonFileSync(path.resolve('./documentationExplorer/doc/doc.yaml')));
  },

};
