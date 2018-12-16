/*
 * According to: Travaux Pratiques dans le cous INF2010 coordonnés par Tarek OULD-BACHIR
 *
 * @authors Allan BEDDOUK & Simon GÉRIN_ROZE
 * @created: 2018-08-27
 */

public class TransparentPixel extends AbstractPixel
{
	public int[] rgba; // donnees de l'image
	
	/**
	 * Constructeur par defaut (pixel blanc)
	 */
	TransparentPixel()
	{
		rgba = new int[4];
		rgba[0] = 255;
		rgba[1] = 255;
		rgba[2] = 255;
		rgba[3] = 255;
	}
	
	/**
	 * Assigne une valeur au pixel
	 * @param rgb: valeurs a assigner 
	 */
	TransparentPixel(int[] rgba)
	{
		this.rgba=rgba.clone();
		
	}
	
	/**
	 * Renvoie un pixel copie de type noir et blanc
	 */
	public BWPixel toBWPixel()
	{
		BWPixel bp= new BWPixel(moyenneRgba(this.rgba)<=127 ? false : true);
		return bp;
		
	}
	
	/**
	 * Renvoie un pixel copie de type tons de gris
	 */
	public GrayPixel toGrayPixel()
	{
		GrayPixel gp=new GrayPixel(moyenneRgba(this.rgba));
		return gp;
		
	}
	
	/**
	 * Renvoie un pixel copie de type couleurs
	 */
	public ColorPixel toColorPixel()
	{
		int[]rgb= {this.rgba[0],this.rgba[1],this.rgba[2]};
		ColorPixel cp=new ColorPixel(rgb);
		return cp;
		
	}
	
	/**
	 * Renvoie le negatif du pixel (255-pixel)
	 */
	public TransparentPixel Negative()
	{
		int[] neg= {255-this.rgba[0],255-this.rgba[1],255-this.rgba[2],this.rgba[3]};
		return new TransparentPixel(neg);
		
	}
	
	public TransparentPixel toTransparentPixel()
	{
		return new TransparentPixel(this.rgba);
		
	}
	
	public void setAlpha(int alpha)
	{
		rgba[3] = alpha;
	}
	
	/**
	 * Convertit le pixel en String (sert a ecrire dans un fichier 
	 * (avec un espace supplémentaire en fin)s
	 */
	public String toString()
	{
		return  ((Integer)rgba[0]).toString() + " " + 
				((Integer)rgba[1]).toString() + " " +
				((Integer)rgba[2]).toString() + " " +
				((Integer)rgba[3]).toString() + " ";
	}

	
	/**
	 * Calcul la moyenne entre les composantes rgba du pixel
	 */
	public int moyenneRgba(int[] rgba)
	{
		return (rgba[0]+rgba[1]+rgba[2]+rgba[3])/4;
	}
}
