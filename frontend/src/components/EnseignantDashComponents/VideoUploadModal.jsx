// frontend/src/components/EnseignantDashComponents/VideoUploadModal.jsx
import { useState, useEffect } from "react";
import { X, Upload, Trash2 } from "lucide-react";
import useEnseignantStore from "../../store/useEnseignantStore";
import { useThemeStore } from '../../store/useThemeStore';
const VideoUploadModal = ({ chapitre, onClose }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const {
    videos,               // toutes les vidéos du store
    fetchVideosByChapitre,
    uploadVideo,
    deleteVideo
  } = useEnseignantStore();

  // Charger les vidéos du chapitre au montage
  useEffect(() => {
    fetchVideosByChapitre(chapitre.id);
  }, [chapitre.id]);
const {theme}=useThemeStore();
  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("description", description);

      await uploadVideo(chapitre.id, formData);

      setFile(null);
      setDescription(""); // réinitialiser la description après upload
    } catch (err) {
      console.error("Erreur lors de l'upload de la vidéo :", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (videoId) => {
    await deleteVideo(videoId, chapitre.id);
  };

  return (
    <div className={`fixed inset-0 ${theme === "light" ? "bg-black/20" : "bg-white/20"} z-50 flex items-center justify-center`}>
      <div className="bg-base-100 p-6 rounded-2xl shadow-lg w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div></div>
          <h2 className="text-2xl text-center audiowide-regular-b">Vidéos du chapitre {chapitre.ordre}</h2>
          <button className="btn btn-sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Liste des vidéos */}
        {videos.length === 0 ? (
          <p className="text-gray-400">Aucune vidéo pour ce chapitre.</p>
        ) : (
          <div className="space-y-4">
            {videos.map((video,index) => (
              <div key={video.id || index} className="flex items-center justify-between  border-b-4 p-3 rounded-lg">
                <div className="w-3/4">
                  <video src={video.url} controls className="w-full rounded-lg" />
                  {video.description && (
                    <p className="text-sm text-gray-500 mt-1">{video.description}</p>
                  )}
                </div>
                <button
                  className="btn btn-sm ml-2"
                  onClick={() => handleDelete(video.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Ajouter une vidéo</h3>
          <textarea
            placeholder="Description de la vidéo"
            className="textarea textarea-bordered w-full mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            accept="video/*"
            className="file-input file-input-bordered w-full mb-3"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="btn btn-primary w-full flex items-center justify-center"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isUploading ? "Upload en cours..." : "Uploader la vidéo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadModal;
