import CardAuthorCompact from '@/components/CardAuthorCompact';
import CardBlogSquare from '@/components/CardBlogSquare';
import PaginationBasic from '@/components/PaginationBasic';
import PaginationBlogList from '@/components/PaginationBlogList';
import FullLayout from '@/layouts/FullLayout'
import { Box, Grid, Typography, Button } from '@mui/material';

const BlogListPage = () => {

    const renderBlogList = () => {
        let result = [];
        for (let i = 0; i < 12; i++) {
            result.push(
                <Grid item>
                    <CardBlogSquare
                        title='Lorem'
                        subcategoryName='bitcoin'
                        usernameCreate='sonpt'
                        userAvatarCreate='abc'
                        dateCreate='1/1/2021'
                        bookmark={true}
                    />
                </Grid>
            )
        }
        return result;
    }

    const renderAuthorList = () => {
        let result = [];
        for (let i = 0; i < 6; i++) {
            result.push(
                <Grid item>
                    <CardAuthorCompact
                        authorName='Lorem'
                        authorAvatar='bitcoin'
                    />
                </Grid>
            )
        }
        return result;
    }

    return (
        <FullLayout>
            <Box className='blog__list'>
                <Typography
                    component='div'
                    variant='h3'
                    fontWeight={900}
                    textAlign='center'
                    marginTop={6}
                    marginBottom={5}
                >
                    Phân tích dự án
                </Typography>
                <Grid container spacing={4} rowSpacing={4} justifyContent='center'>
                    {renderBlogList()}
                </Grid>
                <PaginationBlogList count={100} />
            </Box>

            <Box className='author__list'>
                <Typography
                    component='div'
                    variant='h3'
                    fontWeight={900}
                    textAlign='center'
                    marginTop={6}
                    marginBottom={5}
                >
                    Các tác giả
                </Typography>
                <Grid container spacing={4} rowSpacing={4} justifyContent='center'>
                    {renderAuthorList()}
                </Grid>
                <PaginationBasic count={6} />

            </Box>

        </FullLayout >
    )
}

export default BlogListPage;