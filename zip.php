$zipname = 'document.zip';
            if($user){
                $zipname = strtolower(preg_replace('/\s/', '-', $user->name)).'.zip';
            }
            $zip = new ZipArchive();
            if($zip->open($zipname, ZipArchive::CREATE | ZipArchive::OVERWRITE)){
    
                foreach ($files as $file) {
                  $zip->addFile('user-uploads/user-chat-files/'.$file->hashname, $file->filename);
                }
                $zip->close();
                if(file_exists($zipname)){
                    header("Content-type: application/zip"); 
            
                    header("Cache-Control: public");
            
                    header("Content-Description: File Transfer");
            
                    header("Content-Disposition: attachment; filename=$zipname");
            
                    header("Content-length: ".filesize($zipname));
            
                    header("Pragma: no-cache"); 
            
                    header("Expires: 0"); 
            
                    readfile($zipname);
            
                    unlink($zipname);
            
                }
                
            }
