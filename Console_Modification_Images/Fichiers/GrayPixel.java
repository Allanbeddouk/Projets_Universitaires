/*
 * According to: Travaux Pratiques dans le cous INF2010 coordonnés par Tarek OULD-BACHIR
 *
 * @authors Allan BEDDOUK & Simon GÉRIN_ROZE
 * @created: 2018-08-27
 */

public class GrayPixel  extends AbstractPixel 
{
	int pixel; // donnee du pixel
	
	/**
	 * Constructeur par defaut (pixel blanc)
	 */
	GrayPixel()
	{
		this.pixel = 255;
	}
	
	/**
	 * Constructeur par parametre
	 * @param pixel : valeur du pixel
	 */
	GrayPixel(int pixel)
	{
		this.pixel=pixel;
		
	}
	
	/**
	 * Renvoie la valeur du pixel
	 */
	public int getPixel()
	{
		return pixel;
	}
	
	/**
	 * Assigne une valeur au pixel
	 * @param pixel: valeur a assigner 
	 */
	public void setPixel(int pixel)
	{
		this.pixel = pixel;
	}
	
	/**
	 * Renvoie un pixel copie de type noir et blanc
	 */
	public BWPixel toBWPixel()
	{
		BWPixel bp=new BWPixel((pixel<=127) ? false : true);
		return bp;
		
	}
	
	/**
	 * Renvoie un pixel copie de type tons de gris
	 */
	public GrayPixel toGrayPixel()
	{
		return new GrayPixel(pixel);
		
	}
	
	/**
	 * Renvoie un pixel copie de type couleurs
	 */
	public ColorPixel toColorPixel()
	{
		int rgb[]= {pixel,pixel,pixel};
		ColorPixel cp= new ColorPixel(rgb);
		return cp;
		
	}
	
	public TransparentPixel toTransparentPixel()
	{
		int rgba[]= {pixel,pixel,pixel,255};
		TransparentPixel tp=new TransparentPixel(rgba);
		return tp;
		
	}
	
	/**
	 * Renvoie le negatif du pixel (255-pixel)
	 */
	public AbstractPixel Negative()
	{
		return new GrayPixel(255-this.pixel);
	}
	
	public void setAlpha(int alpha)
	{
		//ne fait rien
	}
	
	/**
	 * Convertit le pixel en String (sert a ecrire dans un fichier 
	 * (avec un espace supplémentaire en fin)s
	 */
	public String toString()
	{
		return ((Integer)(pixel)).toString() + " ";
	}
}
