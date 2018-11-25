/*
 * According to: Travaux Pratiques dans le cous INF2010 coordonnés par Tarek OULD-BACHIR
 *
 * @authors Allan BEDDOUK & Simon GÉRIN_ROZE
 * @created: 2018-08-27
 */

public class ColorPixel extends AbstractPixel
{
	public int[] rgb; // donnees de l'image
	
	/**
	 * Constructeur par defaut (pixel blanc)
	 */
	ColorPixel()
	{
		rgb = new int[3];
		rgb[0] = 255;
		rgb[1] = 255;
		rgb[2] = 255;
	}
	
	/**
	 * Assigne une valeur au pixel
	 * @param rgb: valeurs a assigner 
	 */
	ColorPixel(int[] rgb)
	{
		this.rgb=rgb.clone();
		
	}
	
	/**
	 * Renvoie un pixel copie de type noir et blanc
	 */
	public BWPixel toBWPixel()
	{
		BWPixel bp= new BWPixel(moyenneRgb(this.rgb)<=127 ? false : true);
		return bp;
		
	}
	
	/**
	 * Renvoie un pixel copie de type tons de gris
	 */
	public GrayPixel toGrayPixel()
	{
		GrayPixel gp=new GrayPixel(moyenneRgb(this.rgb));
		return gp;
		
	}
	
	/**
	 * Renvoie un pixel copie de type couleurs
	 */
	public ColorPixel toColorPixel()
	{
		return new ColorPixel(this.rgb);
		
	}
	
	public TransparentPixel toTransparentPixel()
	{
		int[] rgba= {this.rgb[0],this.rgb[1],this.rgb[2],255};
		TransparentPixel tp= new TransparentPixel(rgba);
		return tp;
		
	}
	
	/**
	 * Renvoie le negatif du pixel (255-pixel)
	 */
	public AbstractPixel Negative()
	{
		int[] neg= {255-this.rgb[0],255-this.rgb[1],255-this.rgb[2]};
		return new ColorPixel(neg);
		
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
		return  ((Integer)rgb[0]).toString() + " " + 
				((Integer)rgb[1]).toString() + " " +
				((Integer)rgb[2]).toString() + " ";
	}

	
	/**
	 * Calcul la moyenne entre les composantes rgb du pixel
	 */
	public int moyenneRgb(int[] rgb)
	{
		return (rgb[0]+rgb[1]+rgb[2])/3;
	}
}