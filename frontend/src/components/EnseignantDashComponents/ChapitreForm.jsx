import { useState } from 'react';
import { BookOpen, X, Text, FileText, Image, ListOrdered, Upload } from 'lucide-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useThemeStore } from '../../store/useThemeStore';

const ChapitreForm = ({ coursId, coursTitre, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    img_url: '',
    contenu: '',
    ordre: '',
  });
  const [useEditor, setUseEditor] = useState(true); // Choix entre éditeur ou import
  const { theme } = useThemeStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (_, editor) => {
    const data = editor.getData();
    setFormData((prev) => ({ ...prev, contenu: data }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, contenu: event.target.result }));
      };
      reader.readAsText(file);
    } else {
      alert("Veuillez sélectionner un fichier HTML valide.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coursId) return;
    onSubmit({ ...formData, cours_id: coursId });
  };

  return (
    <div className={`fixed inset-0 ${theme === "light" ? "bg-black/20" : "bg-white/20"} z-50 flex items-center justify-center`}>
      <div className="rounded-lg bg-base-100 p-6 w-full max-w-xl h-[500px] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <h2 className="text-3xl audiowide-regular-b flex items-center gap-2">
            <Text className="w-6 h-6 text-indigo-600" />
            Ajouter un chapitre
          </h2>
          <button onClick={onClose} className='btn btn-sm'>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {coursTitre && (
          <div className="mb-4 text-sm text-indigo-600 font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Cours sélectionné : <span className="text-indigo-900">{coursTitre}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Text className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 z-10 text-gray-300" />
            <input
              type="text"
              name="titre"
              placeholder="Titre du chapitre"
              value={formData.titre}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
              required
            />
          </div>

          <div className="relative">
            <FileText className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 z-10 text-gray-300" />
            <input
              type="text"
              name="description"
              placeholder="Brève description"
              value={formData.description}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
              required
            />
          </div>

          <div className="relative">
            <Image className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 z-10 text-gray-300" />
            <input
              type="text"
              name="img_url"
              placeholder="Lien de l'image"
              value={formData.img_url}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
            />
          </div>

          {/* Choix entre éditeur ou fichier */}
          <div className="flex gap-4 mb-2 text-sm font-medium">
            <label>
              <input type="radio" name="mode" value="editor" checked={useEditor} onChange={() => setUseEditor(true)} />
              <span className="ml-2">Écrire dans l'éditeur</span>
            </label>
            <label>
              <input type="radio" name="mode" value="file" checked={!useEditor} onChange={() => setUseEditor(false)} />
              <span className="ml-2">Importer un fichier HTML</span>
            </label>
          </div>

          {useEditor ? (
            <div className="text-black">
              <label className="label font-semibold mb-1 text-gray-500 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Contenu (éditeur riche) :
              </label>
              <CKEditor
                editor={ClassicEditor}
                data={formData.contenu}
                onChange={handleEditorChange}
              />
            </div>
          ) : (
            <div>
              <label className="label font-semibold text-gray-500 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Importer un fichier HTML :
              </label>
              <input
                type="file"
                accept=".html"
                onChange={handleFileUpload}
                className="file-input file-input-bordered w-full"
              />
            </div>
          )}

          <div className="relative">
            <ListOrdered className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 z-10 text-gray-300" />
            <input
              type="number"
              name="ordre"
              placeholder="Ordre (ex : 1)"
              value={formData.ordre}
              onChange={handleChange}
              className="input input-bordered w-full pl-10"
              required
            />
          </div>

          <div className="mt-6 flex justify-between gap-2">
            <button type="button" onClick={onClose} className="btn btn-error text-white flex items-center gap-2">
              <X className="w-4 h-4" /> Annuler l'action
            </button>
            <button type="submit" className="btn btn-primary flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Créer Chapitre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChapitreForm;
