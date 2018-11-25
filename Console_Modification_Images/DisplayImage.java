/*
 * According to: Travaux Pratiques dans le cous INF2010 coordonnés par Tarek OULD-BACHIR
 *
 * @authors Tarek Ould Bachir, Wail Khemir
 * @created: 2015-09-06
 */
 
import java.awt.*;

public class DisplayImage extends Canvas
{
	static final long serialVersionUID = 0;
	Image  image;
	
	public DisplayImage(Image img) {
		this.image = img;
		setSize(img.getWidth(this), img.getHeight(this));
	}
	
	public void paint(Graphics gr) {
		gr.drawImage(image, 0, 0, this);
	}	
}