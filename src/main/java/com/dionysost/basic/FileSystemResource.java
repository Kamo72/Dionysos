package com.dionysost.basic;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Files;

import org.springframework.core.io.Resource;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

public class FileSystemResource implements Resource {

    private final String path;
    private final File file;
    private final Path filePath;

    public FileSystemResource(String path) {
        Assert.notNull(path, "path must not be null");
        this.path = StringUtils.cleanPath(path);
        this.file = new File(path);
        this.filePath = this.file.toPath();
    }

    @Override
    public InputStream getInputStream() throws IOException {
        if (!this.file.exists()) {
            throw new IOException("File not found: " + this.path);
        }
        return new FileInputStream(this.file);
    }

    @Override
    public boolean exists() {
        return this.file.exists();
    }

    @Override
    public URL getURL() throws IOException {
        if (!this.file.exists()) {
            throw new IOException("File not found: " + this.path);
        }
        return this.file.toURI().toURL();
    }

    @Override
    public URI getURI() throws IOException {
        if (!this.file.exists()) {
            throw new IOException("File not found: " + this.path);
        }
        return this.file.toURI();
    }

    @Override
    public File getFile() throws IOException {
        if (!this.file.exists()) {
            throw new IOException("File not found: " + this.path);
        }
        return this.file;
    }

    @Override
    public long contentLength() throws IOException {
        if (!this.file.exists()) {
            throw new IOException("File not found: " + this.path);
        }
        return Files.size(this.filePath);
    }

    @Override
    public long lastModified() throws IOException {
        if (!this.file.exists()) {
            throw new IOException("File not found: " + this.path);
        }
        return this.file.lastModified();
    }

    @Override
    public Resource createRelative(String relativePath) throws IOException {
        String fullPath = StringUtils.applyRelativePath(this.path, relativePath);
        return new FileSystemResource(fullPath);
    }

    @Override
    public String getFilename() {
        return this.file.getName();
    }

    @Override
    public String getDescription() {
        return "File [" + this.file.getAbsolutePath() + "]";
    }
}