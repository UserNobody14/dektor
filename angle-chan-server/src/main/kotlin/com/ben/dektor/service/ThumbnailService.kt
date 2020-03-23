package com.ben.dektor.service

import org.apache.commons.io.FileUtils
import org.jcodec.api.FrameGrab
import org.jcodec.common.io.NIOUtils
import org.jcodec.common.model.Picture
import org.jcodec.scale.AWTUtil
import org.springframework.scheduling.annotation.Async
import org.springframework.scheduling.annotation.AsyncResult
import org.springframework.stereotype.Service
import java.awt.image.BufferedImage
import java.io.File
import java.io.InputStream
import java.util.concurrent.Future
import javax.imageio.ImageIO


@Service
class ThumbnailService {
    @Async
    fun imageThumbnail(originalImage: BufferedImage): Future<BufferedImage> {
        try {
            val WIDTH = 85
            val HEIGHT = 125
            val thumbnail = BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB)
            val g = thumbnail.createGraphics()
            g.drawImage(originalImage, 0, 0, WIDTH, HEIGHT, null)
            g.dispose()
            return AsyncResult(thumbnail)
        } catch (e: Exception) {
            throw Exception("Image Adjustment Failed")
        }
    }
    @Async
    fun videoThumbnails(inval: InputStream, name: String, suffix: String): Future<BufferedImage> {
        try {
            val startSec = 51.632
            val frameCount = 10
            val newFile: File = File.createTempFile(name, suffix)
            FileUtils.copyInputStreamToFile(inval, newFile)
            val grab: FrameGrab = FrameGrab.createFrameGrab(NIOUtils.readableChannel(newFile))
//            grab.seekToSecondPrecise(startSec)
            val picture: Picture = grab.nativeFrame
            println(picture.width.toString() + "x" + picture.height + " " + picture.color)
            val bufferedImage: BufferedImage = AWTUtil.toBufferedImage(picture)
            return imageThumbnail(bufferedImage)
//            for (i in 0 until frameCount) {
//                val picture: Picture = grab.nativeFrame
//                println(picture.width.toString() + "x" + picture.height + " " + picture.color)
//                val bufferedImage: BufferedImage = AWTUtil.toBufferedImage(picture)
//                ImageIO.write(bufferedImage, "png", File(newFile.absolutePath.toString() + "-frame" + i + ".png"))
//            }
        } catch (e: Exception) {
//            log.error(e.message)
            throw Exception("Video not thumbnailed properly!")
        }
    }
}